import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfilePreviewImage from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import { RootState } from 'utils/redux/store'
import { getUserProfileImage } from 'utils/redux/slices/userSlice'
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
  imageUrl: propImageUrl,
  uploadedImage: propUploadedImage,
  clickable = true,
  openModal,
  setAnchorEl,
  hasIcon = false,
  iconButtonClassName,
  addPhotoIconClassName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const reduxUploadedImage = useSelector(getUserProfileImage)
  const reduxImageUrl = useSelector((state: RootState) => state.avatar.imageUrl)
  const imageUrl = propImageUrl ?? reduxImageUrl
  const uploadedImage = propUploadedImage ?? reduxUploadedImage
  const imageSource = uploadedImage || imageUrl
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'

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
        {hasIcon ? (
          <div className='avatar-icon'>
            <img
              className={imgClassName}
              src={imageSource}
              alt='avatar'
              onClick={handleClick}
            />
            <IconButton
              aria-label='change profile pic'
              className={iconButtonClassName}
              onClick={handleOpenModal}
            >
              <AddAPhotoOutlinedIcon className={addPhotoIconClassName} />
            </IconButton>
          </div>
        ) : (
          <img
            className={imgClassName}
            src={imageSource}
            alt='avatar'
            onClick={handleClick}
          />
        )}
      </div>

      <ProfilePreviewImage
        open={isModalOpen}
        onClose={handleCloseModal}
        uploadedImage={imageSource}
      />
    </>
  )
}

export default Avatar
