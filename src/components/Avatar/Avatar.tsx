import { useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'utils/redux/store'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
import { removeUploadedImage } from 'utils/redux/slices/userSlice'
import ProfilePreviewImage from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import PersonIcon from '@mui/icons-material/Person'
import './Avatar.scss'

/**
 * Avatar component to display a user's avatar image.
 * @param {string} imageUrl - The URL of the avatar image.
 * @param {boolean} [clickable=true] - Indicates if the avatar is clickable.
 * @returns {JSX.Element} - Avatar component.
 */
const Avatar: React.FC<AvatarProps> = ({
  imageUrl: propImageUrl,
  uploadedImage: propUploadedImage,
  clickable = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const reduxImageUrl = useSelector((state: RootState) => state.avatar.imageUrl)
  const reduxUploadedImage = useSelector(
    (state: RootState) => state.ui.auth.user.profilePicture
  )

  const imageUrl = propImageUrl ?? reduxImageUrl
  const uploadedImage = propUploadedImage ?? reduxUploadedImage

  const dispatch = useDispatch()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteImage = () => {
    dispatch(removeUploadedImage())
  }

  // Renders the PersonIcon as an SVG and encodes it as a data URL
  const personIconSvg = renderToStaticMarkup(
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <PersonIcon fill='#afadad' />
    </svg>
  )

  const personIconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
    personIconSvg
  )}`

  const imageSource = uploadedImage || imageUrl || personIconUrl

  return (
    <>
      <img
        className={clickable ? 'avatar-img' : 'non-clickable'}
        src={imageSource}
        alt='avatar'
        onClick={clickable ? openModal : undefined}
      />
      <ProfilePreviewImage
        open={isModalOpen}
        onClose={closeModal}
        uploadedImage={uploadedImage}
        onDelete={handleDeleteImage}
      />
    </>
  )
}

export default Avatar
