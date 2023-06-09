import { useRef } from 'react'
import Cropper from 'react-easy-crop'
import Avatar from 'components/Avatar/Avatar'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import { Box, DialogContent } from '@mui/material'
import { ImageEditorContentProps } from 'interfaces/ProfileImageInterfaces'
import { setUploadedImage } from 'utils/redux/slices/userSlice'
import './ImageEditorModal.scss'

/**
 * ImageEditorContent component displays the image editing content.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @param {Object} crop - The crop position of the image.
 * @param {number} zoom - The zoom level of the image.
 * @param {Function} setCrop - Function to set the crop position of the image.
 * @param {Function} setCropArea - Function to set the crop area of the image.
 * @param {Function} setZoom - Function to set the zoom level of the image.
 * @returns {JSX.Element} - ImageEditorContent component.
 */
const ImageEditorContent: React.FC<ImageEditorContentProps> = ({
  uploadedImage,
  crop,
  zoom,
  setCrop,
  setCropArea,
  setZoom,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * Handles the file input change event and sets the uploaded image.
   * @param {string} dataURL - The image data URL.
   */
  const handleFileInputChange = (dataURL: string) => {
    setUploadedImage(dataURL)
  }

  /**
   * Updates the cropArea state when the crop is complete.
   * @param {Object} croppedArea - The cropped area of the image.
   * @param {Object} croppedAreaPixels - The cropped area of the image in pixels.
   */
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCropArea(croppedAreaPixels)
  }

  return (
    <DialogContent className='image-modal__dialog-content' dividers>
      <FileInput
        onFileChange={handleFileInputChange}
        fileInputRef={fileInputRef}
      />
      {uploadedImage ? (
        <Cropper
          image={uploadedImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
          onZoomChange={setZoom}
          cropShape='round'
          showGrid={false}
        />
      ) : (
        <Box className='image-modal__empty-avatar'>
          <Avatar clickable={false} />
        </Box>
      )}
    </DialogContent>
  )
}

export default ImageEditorContent
