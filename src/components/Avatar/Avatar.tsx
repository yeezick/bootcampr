import { useSelector } from 'react-redux'
import { RootState } from 'utils/redux/store'
import { getUserProfileImage } from 'utils/redux/slices/userSlice'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
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
}) => {
  const reduxUploadedImage = useSelector(getUserProfileImage)
  const reduxImageUrl = useSelector((state: RootState) => state.avatar.imageUrl)
  const imageUrl = propImageUrl ?? reduxImageUrl
  const uploadedImage = propUploadedImage ?? reduxUploadedImage
  const imageSource = uploadedImage || imageUrl
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'

  const handleClick = e => {
    if (clickable) {
      openModal(e)
      return
    } else if (setAnchorEl) {
      setAnchorEl(e.currentTarget)
    }
  }

  return (
    <>
      <img
        className={imgClassName}
        src={imageSource}
        alt='avatar'
        onClick={handleClick}
      />
    </>
  )
}

export default Avatar
