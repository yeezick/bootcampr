import { useCallback, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { setImageUrl } from 'utils/redux/slices/avatarSlice'
import {
  setUploadedImage,
  removeUploadedImage,
} from 'utils/redux/slices/userSlice'
import { updateUserImage, deleteUserImage } from '../../utils/api/services'
import ImageEditorModal from 'components/ImageEditorModal/ImageEditorModal'
import { ProfilePreviewImageProps } from '../../interfaces/ProfileImageInterfaces'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import Avatar from 'components/Avatar/Avatar'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import { FiEdit } from 'react-icons/fi'
import CameraAltIcon from '@mui/icons-material/CameraAltOutlined'
import './ProfilePreviewImage.scss'

/**
 * ProfilePreviewImage component displays a preview of the profile image, allowing the user to add, edit, or delete the image.
 * @param {boolean} open - Indicates if the dialog is open.
 * @param {Function} onClose - Function to call when the dialog is closed.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @returns {JSX.Element} - ProfilePreviewImage component.
 */
const ProfilePreviewImage: React.FC<ProfilePreviewImageProps> = ({
  open,
  onClose,
  uploadedImage,
}) => {
  // State and ref variables
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false)
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const authUser = useAppSelector(selectAuthUser)

  const openImageEditor = () => {
    setIsImageEditorOpen(true)
  }

  const closeImageEditor = () => {
    setIsImageEditorOpen(false)
  }

  const handleOpenFileInput = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handles image upload, dispatches action to set the image URL and closes the editor modal.
   * @param {string} image - The uploaded image in base64 format.
   */
  const handleImageUpload = (image: string) => {
    dispatch(setImageUrl(image))
    closeImageEditor()

    // Send request to update user's profile image in the database
    const userId = authUser._id
    updateUserImage(userId, image)
      .then(() => console.log('Image updated successfully'))
      .catch(err => console.error('Failed to update image:', err))
  }

  /**
   * Handles closing the editor modal and parent dialog.
   */
  const handleEditorModalClose = useCallback(() => {
    onClose()
    setIsImageEditorOpen(false)
  }, [onClose])

  /**
   * Handles discarding changes made to the image.
   */
  const handleDiscardChanges = async () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }

    //Send request to delete user's profile image from the database
    const userId = authUser._id
    try {
      const res = await deleteUserImage(userId)
      if (res.success) {
        dispatch(removeUploadedImage())
        dispatch(setImageUrl(null))
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <FileInput
        onFileChange={dataUrl => {
          dispatch(setUploadedImage(dataUrl))
          setIsImageEditorOpen(true)
        }}
        fileInputRef={fileInputRef}
      />
      <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
        <Box className='profile-preview__header'>
          <div></div>
          <DialogTitle className='profile-preview__title'>
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
              {/* Render uploaded image if available */}
              {Boolean(uploadedImage) ? (
                <div className='profile-preview__profile-image-container'>
                  <img
                    src={uploadedImage as string}
                    alt='Profile'
                    className='profile-preview__profile-image'
                  />
                </div>
              ) : (
                // If uploadedImage is not available, use Avatar
                <Avatar clickable={false} />
              )}
            </Box>
          </DialogContent>
          <DialogActions className='profile-preview__actions'>
            <Box className='profile-preview__action-box'>
              <Box className='profile-preview__edit-box'>
                <Button
                  variant='outlined'
                  className='profile-preview__edit-btn'
                  onClick={openImageEditor}
                >
                  <div className='profile-preview__btn-container'>
                    <FiEdit className='profile-preview__edit-icon' />
                    Edit
                  </div>
                </Button>
                <Button
                  variant='outlined'
                  className='profile-preview__add-btn'
                  onClick={handleOpenFileInput}
                >
                  <div className='profile-preview__btn-container'>
                    <CameraAltIcon className='profile-preview__add-icon' />
                    Add photo
                  </div>
                </Button>
                <Button
                  variant='outlined'
                  className='profile-preview__delete-btn'
                  onClick={handleDiscardChanges}
                >
                  <div className='profile-preview__btn-container'>
                    <DeleteIcon className='profile-preview__delete-icon' />
                    Delete
                  </div>
                </Button>
              </Box>
            </Box>
          </DialogActions>
          <ImageEditorModal
            open={isImageEditorOpen}
            onClose={closeImageEditor}
            onSaveClick={image => {
              handleImageUpload(image)
              setUploadedImage(null)
            }}
            uploadedImage={uploadedImage}
            setUploadedImage={(image: string) =>
              dispatch(setUploadedImage(image))
            }
          />
        </div>
      </Dialog>
    </>
  )
}

export default ProfilePreviewImage
