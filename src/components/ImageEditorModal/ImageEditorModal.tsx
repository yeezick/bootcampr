import { useCallback, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'utils/redux/hooks'
import {
  updateAuthUser,
  getUserProfileImage,
  selectUserId,
  setUploadedImage,
} from 'utils/redux/slices/userSlice'
import { updateUser } from 'utils/api'
import { ImageEditorModalProps } from '../../interfaces/ProfileImageInterfaces'
import ImageEditorHeader from './ImageEditorHeader'
import ImageEditorControls from './ImageEditorControls'
import ImageEditorContent from './ImageEditorContent'
import { saveCroppedImage } from './ImageEditorModalUtils'
import getCroppedImg from 'components/Crop/Utils/CropImage'
import { Dialog, DialogActions } from '@mui/material'
import { Area, Point } from 'react-easy-crop/types'
import './ImageEditorModal.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { updateUserImage } from 'utils/api/services'

/**
 * ImageEditorModal component allows the user to edit, crop, and save images.
 * @param {boolean} open - Indicates if the dialog is open.
 * @param {Function} onClose - Function to call when the dialog is closed.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @param {Function} setUploadedImage - Function to update the uploaded image.
 * @returns {JSX.Element} - ImageEditorModal component.
 */
const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  onOpen,
  onClose,
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
  const dispatch = useAppDispatch()
  const profilePicture = useAppSelector(getUserProfileImage)
  const userId = useAppSelector(selectUserId)

  /**
   * Resets the component state and calls the onClose callback to close the modal.
   */
  const handleClose = useCallback(() => {
    onClose()
    setCrop({ x: 0, y: 0 })
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    setZoom(1)
  }, [onClose])

  /**
   * Generates a cropped image URL, creates an image file from the URL, sends the file to the server, and then closes the modal.
   */
  const handleSave = useCallback(async () => {
    if (profilePicture) {
      getCroppedImg(profilePicture, cropArea, zoom).then(
        async croppedImageURL => {
          if (croppedImageURL) {
            try {
              const croppedImageFile = await saveCroppedImage(croppedImageURL)
              const imageUploaded = await updateUserImage(
                userId,
                croppedImageFile
              )
              const userImageUpdate = await updateUser(userId, {
                hasProfilePicture: true,
              })

              console.log('saved updatedUser', userImageUpdate)
              console.log('saved imagedUploaded', imageUploaded.image)
              dispatch(setUploadedImage(imageUploaded.image))
              dispatch(updateAuthUser(userImageUpdate))
              dispatch(successSnackbar('Photo saved!'))
              handleClose()
            } catch (error) {
              console.log('Failed to generate cropped image URL:', error)
              dispatch(errorSnackbar('Photo did not upload. Please try again.'))
            }
          }
        }
      )
    }
  }, [profilePicture, cropArea, zoom, handleClose, dispatch, userId])

  return (
    <Dialog
      className='image-modal'
      open={onOpen}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
    >
      <ImageEditorHeader handleClose={handleClose} />
      <div className='image-modal__content'>
        <ImageEditorContent
          profilePicture={profilePicture}
          crop={crop}
          zoom={zoom}
          setCrop={setCrop}
          setCropArea={setCropArea}
          setZoom={setZoom}
        />
        <DialogActions className='image-modal__actions'>
          <ImageEditorControls
            handleClose={handleClose}
            handleSave={handleSave}
          />
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default ImageEditorModal
