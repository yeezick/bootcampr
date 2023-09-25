import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfilePreviewImage from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import {
  getUserProfileImage,
  selectHasUploadedProfilePicture,
  selectAuthUser,
} from 'utils/redux/slices/userSlice'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
import { IconButton } from '@mui/material'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import './Avatar.scss'
import { useAppSelector } from 'utils/redux/hooks'

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
  addPhotoIconClassName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const profilePicture = useSelector(getUserProfileImage)
  const hasUploadedProfilePicture = useSelector(selectHasUploadedProfilePicture)
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'
  const authUser = useAppSelector(selectAuthUser)

  // console.log('Avatar Current profile pic', profilePicture)
  // console.log('Avatar Is there a uploaded profile pic', hasUploadedProfilePicture)

  const handleClick = e => {
    if (clickable && openModal) {
      openModal()
      return
    } else if (setAnchorEl) {
      setAnchorEl(e.currentTarget)
    }
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const defaultImageURL = `https://ui-avatars.com/api/?name=${authUser.firstName}+${authUser.lastName}&background=FFA726&color=1A237E&rounded=true&bold=true`

  return (
    <>
      <div className='avatar-container'>
        {hasUploadedProfilePicture ? (
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
              >
                <AddAPhotoOutlinedIcon className={addPhotoIconClassName} />
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
                onClick={handleOpenModal}
              >
                <AddAPhotoOutlinedIcon className={addPhotoIconClassName} />
              </IconButton>
            )}
          </div>
        )}
      </div>

      <ProfilePreviewImage
        open={isModalOpen}
        onClose={handleCloseModal}
        uploadedImage={profilePicture}
      />
    </>
  )
}

export default Avatar
