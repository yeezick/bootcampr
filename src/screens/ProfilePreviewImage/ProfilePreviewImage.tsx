import { useCallback, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import {
  setUploadedImage,
  setDefaultProfilePicture,
} from 'utils/redux/slices/userSlice'
import { updateUserImage, deleteUserImage } from '../../utils/api/services'
import { updateUser } from 'utils/api'
import ImageEditorModal from 'components/ImageEditorModal/ImageEditorModal'
import { ProfilePreviewImageProps } from '../../interfaces/ProfileImageInterfaces'
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

/**
 * ProfilePreviewImage component displays a preview of the profile image, allowing the user to add, edit, or delete the image.
 * @param {boolean} open - Indicates if the dialog is open.
 * @param {Function} onClose - Function to call when the dialog is closed.
 * @param {string} uploadedImage - The uploaded image in base64 format.
 * @returns {JSX.Element} - ProfilePreviewImage component.
 */

// BUG: Profile preview picture size scss fix (Update): bypassing preview to edit photo box instead
// TODO: Ask UXE team on what will the image modal will show when theirs no photo (Update): I will need to reverse the order of what displays first when clicking icon button ex: click icon -> file search box -> Profile photo box -> Edit photo box

const ProfilePreviewImage: React.FC<ProfilePreviewImageProps> = ({
  open,
  onClose,
  uploadedImage,
}) => {
  // State and ref variables
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false)
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
    updateUserImage(userId, image)
      .then(() => {
        console.log('Image updated successfully')
        dispatch(setUploadedImage(image))
      })
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

    try {
      const res = await deleteUserImage(userId)
      if (res.success) {
        const userImageUpdate = await updateUser(userId, {
          hasUploadedProfilePicture: false,
        })
        dispatch(updateAuthUser(userImageUpdate))
        console.log('Profile Preview Image =======', userImageUpdate)

        console.log('Image deleted successfully')
        dispatch(setUploadedImage(''))
        dispatch(setDefaultProfilePicture())
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const isUrl = str => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '(www\\.)' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}$',
      'i'
    )
    return urlPattern.test(str)
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
                    onClick={handleDiscardChanges}
                  >
                    <GrTrash className='profile-preview__delete-icon' />
                  </IconButton>
                  <p>Delete</p>
                </div>
              </Box>
            </Box>
          </DialogActions>
          <ImageEditorModal
            open={isImageEditorOpen}
            onClose={closeImageEditor}
            onSaveClick={image => {
              handleImageUpload(image)
            }}
            uploadedImage={uploadedImage}
          />
        </div>
      </Dialog>
    </>
  )
}

export default ProfilePreviewImage
