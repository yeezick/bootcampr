import { useCallback, useState, useRef } from 'react'
import { ImageEditorModalProps } from 'utilities/types/ProfileImageInterfaces'
import { Dialog, DialogActions } from '@mui/material'
import { createUserImage, saveCroppedImage } from './ImageEditorModalUtils'
import ImageEditorHeader from './ImageEditorHeader'
import ImageEditorControls from './ImageEditorControls'
import ImageEditorContent from './ImageEditorContent'
import { Area, Point } from 'react-easy-crop/types'
import getCroppedImg from 'components/Crop/Utils/CropImage'
import './ImageEditorModal.scss'

/**
 * ImageEditorModal component allows the user to edit, crop, and save images.
 * @param {boolean} open - Indicates if the dialog is open.
 * @param {Function} onClose - Function to call when the dialog is closed.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @param {Function} setUploadedImage - Function to update the uploaded image.
 * @param {Function} onSaveClick - Function to call when the save button is clicked.
 * @returns {JSX.Element} - ImageEditorModal component.
 */
const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  open,
  onClose,
  uploadedImage,
  setUploadedImage,
  onSaveClick,
}) => {
  // Component state for managing the uploaded image, crop position, crop area, and zoom level
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [cropArea, setCropArea] = useState<Area>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  })
  const [zoom, setZoom] = useState<number>(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * Sets the uploaded image URL.
   * @param {string} dataUrl - The data URL of the uploaded image.
   */
  const handleUpload = (dataUrl: string) => {
    setUploadedImage(dataUrl)
  }

  /**
   * Resets the component state and calls the onClose callback to close the modal.
   */
  const handleClose = useCallback(() => {
    onClose()
    setUploadedImage(null)
    setCrop({ x: 0, y: 0 })
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    setZoom(1)
  }, [onClose])

  /**
   * Generates a cropped image URL, creates an image file from the URL, sends the file to the server, and then closes the modal.
   */
  const handleSave = useCallback(async () => {
    if (uploadedImage) {
      getCroppedImg(uploadedImage, cropArea, zoom).then(
        async croppedImageURL => {
          console.log('Cropped Image URL:', croppedImageURL)

          if (croppedImageURL) {
            try {
              const croppedImageFile = await saveCroppedImage(croppedImageURL)
              await createUserImage(
                croppedImageFile,
                '643c361cbbc6a57bfbeb0b57'
              )

              onSaveClick(croppedImageURL)

              handleClose()
            } catch (error) {
              console.log('Failed to generate cropped image URL:', error)
            }
          }
        }
      )
    }
  }, [uploadedImage, cropArea, zoom, handleClose, onSaveClick])

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <ImageEditorHeader handleClose={handleClose} />
      <div className='image-modal__content'>
        <ImageEditorContent
          uploadedImage={uploadedImage}
          crop={crop}
          zoom={zoom}
          setCrop={setCrop}
          setCropArea={setCropArea}
          setZoom={setZoom}
        />
        <DialogActions className='image-modal__actions'>
          <ImageEditorControls
            fileInputRef={fileInputRef}
            handleUpload={handleUpload}
            zoom={zoom}
            setZoom={setZoom}
            handleSave={handleSave}
          />
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default ImageEditorModal
