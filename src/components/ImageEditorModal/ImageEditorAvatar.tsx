import { useRef } from 'react'
import Cropper from 'react-easy-crop'
import Avatar from 'components/Avatar/Avatar'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import { Box, DialogContent } from '@mui/material'
import { ImageEditorContentProps } from 'interfaces/ProfileImageInterfaces'
import { setUploadedImage } from 'utils/redux/slices/userSlice'
import { useAppDispatch } from 'utils/redux/hooks'
import './ImageEditorModal.scss'

/**
 * ImageEditorAvatar component displays the image editing content.
 * @param {string} profilePicture - The uploaded image in base64 format.
 * @param {Object} crop - The crop position of the image.
 * @param {number} zoom - The zoom level of the image.
 * @param {Function} setCrop - Function to set the crop position of the image.
 * @param {Function} setCropArea - Function to set the crop area of the image.
 * @param {Function} setZoom - Function to set the zoom level of the image.
 * @returns {JSX.Element} - ImageEditorAvatar component.
 */
export const ImageEditorAvatar: React.FC<ImageEditorContentProps> = ({
  profilePicture,
  crop,
  zoom,
  setCrop,
  setCropArea,
  setZoom,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const handleFileInputChange = (dataUrl: string) => {
    dispatch(setUploadedImage(dataUrl))
  }

  /**
   * Updates the cropArea state when the crop is complete.
   * @param {Object} croppedArea - The cropped area of the image.
   * @param {Object} croppedAreaPixels - The cropped area of the image in pixels.
   */
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropArea(croppedAreaPixels)
  }

  return (
    <DialogContent className='image-modal__dialog-content' dividers>
      <FileInput
        onFileChange={handleFileInputChange}
        fileInputRef={fileInputRef}
      />
      {profilePicture ? (
        <Cropper
          image={profilePicture}
          crop={crop}
          zoom={zoom} // currently disable for future release
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape='round'
          cropSize={{ width: 300, height: 300 }}
          showGrid={false}
        />
      ) : (
        <Box className='image-modal__empty-avatar'>
          <Avatar clickable={false} hasIcon={false} />
        </Box>
      )}
    </DialogContent>
  )
}
