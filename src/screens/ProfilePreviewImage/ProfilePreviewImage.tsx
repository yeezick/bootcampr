import { useCallback, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import {
  setUploadedImage,
  setDefaultProfilePicture,
} from 'utils/redux/slices/userSlice'
import { ProfilePreviewImageProps } from 'interfaces/ProfileImageInterfaces'
import { updateUserImage, deleteUserImage } from '../../utils/api/services'
import { updateUser } from 'utils/api'
import ImageEditorModal from 'components/ImageEditorModal/ImageEditorModal'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import Avatar from 'components/Avatar/Avatar'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { RiFileEditLine } from 'react-icons/ri'
import { GrTrash } from 'react-icons/gr'
import { MdOutlineCameraEnhance } from 'react-icons/md'
import './ProfilePreviewImage.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton, TextButton } from 'components/Buttons'

/**
 * ProfilePreviewImage component displays a preview of the profile image, allowing the user to add, edit, or delete the image.
 * @param {boolean} open - Indicates if the dialog is open.
 * @param {Function} onClose - Function to call when the dialog is closed.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @returns {JSX.Element} - ProfilePreviewImage component.
 */

export const ProfilePreviewImage: React.FC<ProfilePreviewImageProps> = ({
  onOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openImageEditor = () => setIsImageEditorOpen(true)
  const closeImageEditor = () => setIsImageEditorOpen(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)
  const handleOpenFileInput = () => fileInputRef.current?.click()

  const handleEditorModalClose = useCallback(() => {
    onClose()
    setIsImageEditorOpen(false)
  }, [onClose])

  /**
   * Handles image upload, dispatches action to set the image URL and closes the editor modal.
   * @param {string} image - The uploaded image in base64 format.
   */
  const handleImageUpload = async (image: string) => {
    try {
      await updateUserImage(userId, image)
      console.log('Image updated successfully')
      dispatch(setUploadedImage(image))
    } catch (error) {
      console.log('Failed to update image:', error)
    }
  }

  const handleFileInputChange = useCallback(
    (dataUrl: string) => {
      dispatch(setUploadedImage(dataUrl))
      setIsImageEditorOpen(true)
      handleImageUpload(dataUrl)
    },
    [dispatch]
  )

  return (
    <>
      <FileInput
        onFileChange={handleFileInputChange}
        fileInputRef={fileInputRef}
      />
      <Dialog
        className='profile-preview'
        open={onOpen}
        onClose={onClose}
        maxWidth='sm'
        fullWidth
      >
        <Box className='profile-preview__header'>
          <div></div>
          <DialogTitle className='profile-preview__title' id='title'>
            Profile photo
          </DialogTitle>
          <CloseIcon
            className='profile-preview__close-btn'
            onClick={handleEditorModalClose}
          />
        </Box>
        <div className='profile-preview__content'>
          <DialogContent dividers className='profile-preview__dialog-content'>
            <Box className='profile-preview__content-box'>
              <Avatar clickable={false} hasIcon={false} />
            </Box>
          </DialogContent>
          <DialogActions className='profile-preview__actions'>
            <Box className='profile-preview__action-box'>
              <Box className='profile-preview__edit-box'>
                <div className='profile-preview__btn-container'>
                  <IconButton
                    aria-label='edit'
                    className='profile-preview__edit-btn'
                    onClick={openImageEditor}
                  >
                    <RiFileEditLine className='profile-preview__edit-icon' />
                  </IconButton>
                  <p>Edit</p>
                </div>
                <div className='profile-preview__btn-container'>
                  <IconButton
                    aria-label='change'
                    className='profile-preview__add-btn'
                    onClick={handleOpenFileInput}
                  >
                    <MdOutlineCameraEnhance className='profile-preview__add-icon' />
                  </IconButton>
                  <p>Change photo</p>
                </div>
                <div className='profile-preview__btn-container'>
                  <IconButton
                    aria-label='delete'
                    className='profile-preview__delete-btn'
                    onClick={openDeleteModal}
                  >
                    <GrTrash className='profile-preview__delete-icon' />
                  </IconButton>
                  <p>Delete</p>
                </div>
              </Box>
            </Box>
          </DialogActions>
          <DeleteWarningModal
            userId={userId}
            dispatch={dispatch}
            onClose={onClose}
            isDeleteModalOpen={isDeleteModalOpen}
            closeDeleteModal={closeDeleteModal}
          />
          <ImageEditorModal
            onOpen={isImageEditorOpen}
            onClose={closeImageEditor}
          />
        </div>
      </Dialog>
    </>
  )
}

const DeleteWarningModal = ({
  userId,
  dispatch,
  onClose,
  isDeleteModalOpen,
  closeDeleteModal,
}) => {
  /**
   * Handles discarding changes made to the image.
   */
  const handleDeleteImage = async () => {
    try {
      const res = await deleteUserImage(userId)
      if (res.success) {
        const userImageUpdate = await updateUser(userId, {
          hasProfilePicture: false,
        })
        dispatch(updateAuthUser(userImageUpdate))
        dispatch(setUploadedImage(''))
        dispatch(setDefaultProfilePicture())
        dispatch(successSnackbar('Profile photo deleted'))
        closeDeleteModal()
        onClose()
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (err) {
      console.log('Error deleting image:', err)
      dispatch(errorSnackbar('Profile photo did not delete. Please try again.'))
    }
  }

  return (
    <>
      <Dialog open={isDeleteModalOpen} maxWidth='xs' fullWidth>
        <div className='profile-preview__dialog'>
          <div className='profile-preview__text-content'>
            <DialogTitle
              className='profile-preview__dialog-title'
              id='dialog-title'
            >
              Delete profile photo?
            </DialogTitle>
            <DialogContent
              className='profile-preview__dialog-text'
              id='dialog-text'
            >
              <p>
                Your profile image will default to your initials. But your team
                members might miss seeing your face.
              </p>
            </DialogContent>
          </div>
          <DialogActions>
            <TextButton label='Cancel' onClick={closeDeleteModal} />
            <PrimaryButton
              colorScheme='secondary'
              label='Delete'
              onClick={handleDeleteImage}
            />
          </DialogActions>
        </div>
      </Dialog>
    </>
  )
}
