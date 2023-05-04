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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '../../assets/Icons/edit.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import './ProfilePreviewImage.scss'

/**
 * ProfilePreviewImage component displays a preview of the profile image, allowing the user to add, edit, or delete the image.
 * @param {Object} props - Properties passed to the component.
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

  /**
   * Opens the image editor modal.
   */
  const openImageEditor = () => {
    setIsImageEditorOpen(true)
  }

  /**
   * Closes the image editor modal.
   */
  const closeImageEditor = () => {
    setIsImageEditorOpen(false)
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
        <Box className='container'>
          <div></div>
          <DialogTitle className='title'>Profile photo</DialogTitle>
          <CloseIcon className='close-btn' onClick={handleEditorModalClose} />
        </Box>
        <div className='image-modal'>
          <DialogContent
            dividers
            sx={{
              background: '#000',
              position: 'relative',
              height: 400,
              width: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              {/* Render uploaded image if available */}
              {Boolean(uploadedImage) ? (
                <>
                  <img
                    src={uploadedImage as string}
                    alt='Profile'
                    className='profile-image'
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
          <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
            <Box sx={{ width: '100%', mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant='outlined'
                  className='edit-btn'
                  startIcon={
                    <img src={EditIcon} className='edit-icon' alt='editIcon' />
                  }
                  onClick={openImageEditor}
                >
                  Edit
                </Button>
                <Button
                  variant='outlined'
                  className='add-btn'
                  startIcon={<CameraAltIcon />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add photo
                </Button>
                <Button
                  variant='outlined'
                  className='delete-btn'
                  startIcon={<DeleteIcon />}
                  onClick={handleDiscardChanges}
                >
                  Delete
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
