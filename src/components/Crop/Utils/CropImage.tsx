// Import the blueimp-load-image library to handle image loading and orientation
import loadImage from 'blueimp-load-image'

// Function to create an HTMLImageElement from a given URL
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    // Resolve the promise when the image is successfully loaded
    image.addEventListener('load', () => resolve(image))
    // Reject the promise if there's an error loading the image
    image.addEventListener('error', error => reject(error))
    image.src = url
  })

// Function to convert degrees to radians
export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

// Interface for size with width and height properties
export interface Size {
  width: number
  height: number
}

// Interface for flip options with horizontal and vertical properties
export interface Flip {
  horizontal: boolean
  vertical: boolean
}

/**
 * Function to calculate the new bounding area of a rotated rectangle.
 */
export function rotateSize(
  width: number,
  height: number,
  rotation: number
): Size {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * Function to generate a cropped image based on the given parameters.
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Size & { x: number; y: number },
  rotation = 0,
  flip: Flip = { horizontal: false, vertical: false }
): Promise<string | null> {
  // Function to create a canvas with the adjusted orientation
  async function getOrientationAdjustedCanvas(
    imageSrc: string
  ): Promise<HTMLCanvasElement> {
    console.log('Image Src:', imageSrc)
    return new Promise((resolve, reject) => {
      loadImage(
        imageSrc,
        canvasWithOrientation => {
          if ((canvasWithOrientation as any).type === 'error') {
            console.error('Error loading image:', canvasWithOrientation)
            reject('Error loading image')
            return
          }
          resolve(canvasWithOrientation as HTMLCanvasElement)
        },
        {
          orientation: true,
          canvas: true,
        }
      )
    })
  }

  // Get the canvas with the adjusted orientation
  const canvasWithOrientation = await getOrientationAdjustedCanvas(imageSrc)

  // Create a new canvas and get its 2D context
  console.log('canvasWithOrientation:', canvasWithOrientation)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // Calculate the bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    canvasWithOrientation.width,
    canvasWithOrientation.height,
    rotation
  )

  // Set the canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // Translate the canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(
    -canvasWithOrientation.width / 2,
    -canvasWithOrientation.height / 2
  )

  // Draw the rotated image on the canvas
  ctx.drawImage(canvasWithOrientation, 0, 0)

  // croppedAreaPixels values are relative to the bounding box
  // Extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  )

  // Set the canvas width and height to the final desired crop size - this will clear the existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Paste the generated rotated image at the top left corner of the canvas
  ctx.putImageData(data, 0, 0)

  // Return the cropped image as a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      console.log('Blob file:', file)
      if (file) {
        const blobUrl = URL.createObjectURL(file)
        console.log('Blob URL:', blobUrl)
        resolve(blobUrl)
      } else {
        reject('Failed to create Blob.')
      }
    }, 'image/jpeg')
  })
}
