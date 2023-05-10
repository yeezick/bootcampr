import { useCallback, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'utilities/redux/store'
import { setImageUrl } from 'utilities/redux/slices/avatarSlice'
import { setUploadedImage } from 'utilities/redux/slices/profileSlice'
import ImageEditorModal from 'components/ImageEditorModal/ImageEditorModal'
import { ProfilePreviewImageProps } from 'utilities/types/ProfileImageInterfaces'
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
import EditIcon from '../../assets/Icons/edit.png'
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
  const imageUrl = useSelector((state: RootState) => state.avatar.imageUrl)
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
    console.log('Change Photo button clicked')
  }

  /**
   * Handles image upload, dispatches action to set the image URL and closes the editor modal.
   * @param {string} image - The uploaded image in base64 format.
   */
  const handleImageUpload = (image: string) => {
    dispatch(setImageUrl(image))
    closeImageEditor()
    console.log('Uploaded image:', image)
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
  const handleDiscardChanges = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }
    dispatch(setUploadedImage(null))
    dispatch(setImageUrl(null))
    console.log('Delete button clicked')
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
                <>
                  <img
                    src={uploadedImage as string}
                    alt='Profile'
                    className='profile-preview__profile-image'
                  />
                  {console.log('Image is uploaded:', uploadedImage)}
                </>
              ) : Boolean(imageUrl) ? (
                // Render avatar component with imageUrl if available
                <Avatar imageUrl={imageUrl} clickable={false} />
              ) : (
                // Render default avatar component if no imageUrl available
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
                    <img
                      src={EditIcon}
                      className='profile-preview__edit-icon'
                      alt='editIcon'
                    />
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
