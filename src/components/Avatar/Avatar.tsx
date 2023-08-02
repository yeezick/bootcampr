import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfilePreviewImage from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import { RootState } from 'utils/redux/store'
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
  const hasUploadedProfilePicture = useSelector(selectHasUploadedProfilePicture)
  const dispatch = useDispatch()
  const imageUrl = propImageUrl ?? reduxImageUrl
  const uploadedImage = propUploadedImage ?? reduxUploadedImage
  const imageSource = uploadedImage || imageUrl
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'

  useEffect(() => {
    dispatch(setDefaultProfilePicture())
  }, [dispatch])

  console.log('If uploaded: ', hasUploadedProfilePicture)
  console.log('Profile Picture: ', reduxUploadedImage)

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
          // Display the custom profile picture or uploaded image
          <div className='avatar-icon'>
            <img
              className={imgClassName}
              src={imageSource}
              alt='avatar'
              onClick={handleClick}
            />
            {hasIcon && ( // Display the add photo icon if hasIcon is true
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
          // Display the default profile picture (initials)
          <div className='avatar-default-picture'>
            {/* Render the initials here */}
            <p>{reduxUploadedImage}</p>
            {hasIcon && ( // Display the add photo icon if hasIcon is true
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
        uploadedImage={imageSource}
      />
    </>
  )
}

export default Avatar

/* 
<div className="userProfile__defaultPic">
  <p>
    {intitials}
  </p>
</div>
*/
