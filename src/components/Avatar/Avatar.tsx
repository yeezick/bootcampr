import { useState, useEffect, useRef } from 'react'
import {
  getUserProfileImage,
  selectHasUploadedProfilePicture,
  selectAuthUser,
  setUploadedImage,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
import { ProfilePreviewImage } from 'screens/ProfilePreviewImage/ProfilePreviewImage'
import { IconButton } from '@mui/material'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import './Avatar.scss'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'

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
  const dispatch = useAppDispatch()
  const profilePicture = useAppSelector(getUserProfileImage)
  const authUser = useAppSelector(selectAuthUser)
  const hasUploadedProfilePicture = useAppSelector(
    selectHasUploadedProfilePicture
  )
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'
  const fileInputRef = useRef<HTMLInputElement>(null)

  // console.log('Avatar Current profile pic', profilePicture)
  // console.log(
  //   'Avatar Is there a uploaded profile pic',
  //   hasUploadedProfilePicture
  // )

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
    if (!hasUploadedProfilePicture && hasIcon) {
      fileInputRef.current?.click()
    }
  }

  const handleFileInputChange = (dataURL: string) => {
    dispatch(setUploadedImage(dataURL))
    setIsModalOpen(true)
  }

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
                onClick={handleIconClick}
              >
                <AddAPhotoOutlinedIcon className={addPhotoIconClassName} />
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
