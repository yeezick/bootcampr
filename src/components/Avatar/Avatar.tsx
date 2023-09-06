import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfilePreviewImage from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import {
  getUserProfileImage,
  setDefaultProfilePicture,
  selectHasUploadedProfilePicture,
} from 'utils/redux/slices/userSlice'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
import { IconButton } from '@mui/material'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
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
  addPhotoIconClassName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const reduxUploadedImage = useSelector(getUserProfileImage)
  const hasUploadedProfilePicture = useSelector(selectHasUploadedProfilePicture)
  const dispatch = useDispatch()
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'

  useEffect(() => {
    dispatch(setDefaultProfilePicture())
  }, [dispatch])

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

  return (
    <>
      <div className='avatar-container'>
        {hasUploadedProfilePicture ? (
          <div className='avatar-icon'>
            <img
              className={imgClassName}
              src={reduxUploadedImage}
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
            <p>{reduxUploadedImage}</p>
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
        uploadedImage={reduxUploadedImage}
      />
    </>
  )
}

export default Avatar
