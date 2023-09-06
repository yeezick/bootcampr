import { useCallback, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { setImageUrl } from 'utils/redux/slices/avatarSlice'
import {
  setUploadedImage,
  setDefaultProfilePicture,
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
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        dispatch(setDefaultProfilePicture())
        dispatch(setImageUrl(null))
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (err) {
      console.error(err)
    }
  }

  console.log('uploaded image prop: ', uploadedImage)

  const isUrl = str => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '(www\\.)' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}$',
      'i'
    )
    return urlPattern.test(str)
  }

  // BUG: Profile preview picture size scss fix
  // BUG: Default Profile initials can't be replaced with new uploaded image fix
  // BUG: If user already profile picture and they want to change it with new one, it will instead default to profile initials and will save aws saved image but wont display it.
  // BUG: TypeError when deleting image but deletes successfully WTF?
  // BUG: When default image is present and a attempt to change photo is initiated a loading process will commence and last longer then it should
  // TODO: Ask UXE team on what will the image modal will show when theirs no photo
  // TODO: Ask UXE team on what will the have the icon button and what will not for Edit/User profile

  return (
    <>
      <FileInput
        onFileChange={dataUrl => {
          dispatch(setUploadedImage(dataUrl))
          setIsImageEditorOpen(true)
        }}
        fileInputRef={fileInputRef}
      />
      <Dialog
        className='profile-preview'
        open={open}
        onClose={onClose}
        maxWidth='sm'
        fullWidth
      >
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
              {/* <div className='profile-preview__profile-image-container'>
                <Avatar clickable={false} hasIcon={false} />
              </div> */}
              {/* TODO: Check why this is not working */}
              {/* Render uploaded image if available */}
              {isUrl(uploadedImage) ? (
                <div className='profile-preview__profile-image-container'>
                  <img
                    src={uploadedImage}
                    alt='Profile'
                    className='profile-preview__profile-image'
                  />
                </div>
              ) : (
                // If uploadedImage is not available, use Avatar
                <Avatar clickable={false} hasIcon={false} />
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
