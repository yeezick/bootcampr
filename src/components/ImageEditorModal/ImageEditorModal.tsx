import { useCallback, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'utils/redux/hooks'
import {
  getUserProfileImage,
  selectUserId,
  setUploadedImage,
} from 'utils/redux/slices/userSlice'
import { ToggleImageModalProps } from '../../interfaces/ProfileImageInterfaces'
import { ImageEditorAvatar } from './ImageEditorAvatar'
import { ImageEditorControls } from './ImageEditorControls'
import { saveCroppedImage } from './ImageEditorModalUtils'
import getCroppedImg from 'components/Crop/Utils/CropImage'
import { Box, DialogTitle, Dialog, DialogActions } from '@mui/material'
import { Area, Point } from 'react-easy-crop/types'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { updateUserImage } from 'utils/api/services'
import CloseIcon from '@mui/icons-material/Close'
import './ImageEditorModal.scss'

/**
 * ImageEditorModal component allows the user to edit, crop, and save images.
 * @param {boolean} open - Indicates if the dialog is open.
 * @param {Function} onClose - Function to call when the dialog is closed.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @param {Function} setUploadedImage - Function to update the uploaded image.
 * @returns {JSX.Element} - ImageEditorModal component.
 */
export const ImageEditorModal: React.FC<ToggleImageModalProps> = ({
  onOpen,
  onClose,
  onCloseProfilePreviewAvatarModal = () => {},
  setImageUploaded,
}) => {
  const dispatch = useAppDispatch()
  const profilePicture = useAppSelector(getUserProfileImage)
  const userId = useAppSelector(selectUserId)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [cropArea, setCropArea] = useState<Area>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  })
  // const [zoom, setZoom] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClose = useCallback(() => {
    setCrop({ x: 0, y: 0 })
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    // setZoom(1)
    onClose()
  }, [onClose])

  /**
   * Generates a cropped image URL, creates an image file from the URL, sends the file to the server, and then closes the modal.
   */
  const handleSave = useCallback(async () => {
    if (profilePicture) {
      getCroppedImg(profilePicture, cropArea).then(async croppedImageURL => {
        if (croppedImageURL) {
          setIsLoading(true)
          try {
            const croppedImageFile = await saveCroppedImage(croppedImageURL)
            const updateUser = await updateUserImage(userId, croppedImageFile)
            dispatch(setUploadedImage(updateUser.image))
            dispatch(successSnackbar('Photo saved!'))
            handleClose()
            onCloseProfilePreviewAvatarModal()
            setIsLoading(false)
            if (setImageUploaded) setImageUploaded(true)
          } catch (error) {
            console.log('Failed to generate cropped image URL:', error)
            dispatch(errorSnackbar('Photo did not upload. Please try again.'))
            setIsLoading(false)
          }
        }
      })
    }
  }, [
    profilePicture,
    cropArea,
    handleClose,
    onCloseProfilePreviewAvatarModal,
    dispatch,
    userId,
    setImageUploaded,
  ])

  return (
    <Dialog
      className='image-modal'
      open={onOpen}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
    >
      <Box className='image-modal__header'>
        <div></div>
        <DialogTitle className='image-modal__title'>Edit photo</DialogTitle>
        <CloseIcon className='image-modal__close-btn' onClick={onClose} />
      </Box>
      <div className='image-modal__content'>
        <ImageEditorAvatar
          profilePicture={profilePicture}
          crop={crop}
          setCrop={setCrop}
          setCropArea={setCropArea}
          // zoom={zoom}
          // setZoom={setZoom}
        />
        <DialogActions className='image-modal__actions'>
          <ImageEditorControls
            handleClose={handleClose}
            handleSave={handleSave}
            isLoading={isLoading}
          />
        </DialogActions>
      </div>
    </Dialog>
  )
}
