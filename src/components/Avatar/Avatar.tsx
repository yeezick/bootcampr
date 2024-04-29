import { useState, useEffect, useRef } from 'react'
import {
  getUserProfileImage,
  selectAuthUser,
  setUploadedImage,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
import { ProfilePreviewImage } from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import { IconButton } from '@mui/material'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import { generateDefaultPicture } from 'utils/helpers'
import './Avatar.scss'

/**
 * Avatar component to display a user's avatar image.
 * @param {boolean} [clickable=true] - Indicates if the avatar is clickable.
 * @returns {JSX.Element} - Avatar component.
 */
const Avatar: React.FC<AvatarProps> = ({
  clickable = true,
  openModal,
  setAnchorEl,
  hasIcon = false,
  iconButtonClassName,
  addPhotoIconId,
  size,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const profilePicture = useAppSelector(getUserProfileImage)
  const authUser = useAppSelector(selectAuthUser)
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  useEffect(() => {
    dispatch(setUploadedImage(profilePicture))
  }, [dispatch, profilePicture])

  const handleClick = e => {
    if (clickable && openModal) {
      openModal()
      return
    } else if (setAnchorEl) {
      setAnchorEl(e.currentTarget)
    }
  }

  const handleIconClick = () => {
    if (!profilePicture && hasIcon) {
      fileInputRef.current?.click()
    }
  }

  const handleFileInputChange = (dataURL: string) => {
    dispatch(setUploadedImage(dataURL))
    setIsModalOpen(true)
  }
  const defaultImageURL = generateDefaultPicture(
    authUser.firstName,
    authUser.lastName
  )
  // create a func to check if the image does exist via fetch

  return (
    <>
      <div className='avatar-container'>
        {profilePicture ? (
          <div className='avatar-icon'>
            <img
              className={imgClassName}
              src={profilePicture}
              alt='avatar'
              onClick={handleClick}
            />
            {hasIcon && (
              <IconButton
                aria-label='change profile pic'
                className={iconButtonClassName}
                onClick={handleOpenModal}
                sx={{ backgroundColor: '#ecebeb' }}
              >
                <AddAPhotoOutlinedIcon id={addPhotoIconId} />
              </IconButton>
            )}
          </div>
        ) : (
          <div className='avatar-default-picture'>
            <img src={defaultImageURL} alt='default' />
            {hasIcon && (
              <IconButton
                aria-label='change profile pic'
                className='avatar-default-cameraIcon'
                id='cameraIcon'
                onClick={handleIconClick}
              >
                <AddAPhotoOutlinedIcon id={addPhotoIconId} />
              </IconButton>
            )}
          </div>
        )}
      </div>
      <FileInput
        onFileChange={handleFileInputChange}
        fileInputRef={fileInputRef}
      />
      <ProfilePreviewImage onOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default Avatar
