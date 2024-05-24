import { useState, useEffect, useRef, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  getUserProfileImage,
  selectAuthUser,
  setUploadedImage,
} from 'utils/redux/slices/userSlice'
import { selectUsersById } from 'utils/redux/slices/projectSlice'
import { generateDefaultPicture } from 'utils/helpers'
import { AvatarProps } from 'interfaces/ProfileImageInterfaces'
import { ProfilePreviewAvatar } from 'screens/ProfilePreviewAvatar/ProfilePreviewAvatar'
import { ImageEditorModal } from 'components/ImageEditorModal/ImageEditorModal'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import { IconButton } from '@mui/material'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import './Avatar.scss'

/**
 * Avatar component to display a user's avatar image.
 * @param {boolean} [clickable=true] - Indicates if the avatar is clickable.
 * @returns {JSX.Element} - Avatar component.
 */
export const Avatar: React.FC<AvatarProps> = ({
  clickable = true,
  openModal,
  setAnchorEl,
  hasIcon = false,
  iconButtonClassName,
  addPhotoIconId,
  userId,
}) => {
  const dispatch = useAppDispatch()
  const memoizedUserId = useMemo(() => selectUsersById([userId]), [userId])
  const [user] = useAppSelector(memoizedUserId)
  const profilePicture = useAppSelector(getUserProfileImage)
  const authUser = useAppSelector(selectAuthUser)
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(false)
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [userNames, setUserNames] = useState({
    firstName: '',
    lastName: '',
  })
  const imgClassName = clickable || setAnchorEl ? 'avatar-img' : 'non-clickable'
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCloseImageEditor = () => setIsImageEditorOpen(false)

  const defaultImageURL = generateDefaultPicture(
    userNames.firstName,
    userNames.lastName
  )

  useEffect(() => {
    dispatch(setUploadedImage(profilePicture))
    if (profilePicture === defaultImageURL) {
      setImageUploaded(false)
    }
  }, [dispatch, profilePicture, defaultImageURL])

  useEffect(() => {
    if (user) {
      setUserNames({ firstName: user.firstName, lastName: user.lastName })
    } else {
      setUserNames({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
      })
    }
  }, [authUser, user])

  const handleFileInputChange = (dataUrl: string) => {
    dispatch(setUploadedImage(dataUrl))
    setIsImageEditorOpen(true)
  }

  const handleAvatarClick = e => {
    if (clickable && openModal) {
      openModal()
      return
    } else if (setAnchorEl) {
      setAnchorEl(e.currentTarget)
    }
  }

  const handleAvatarIconClick = () => {
    if (!hasIcon) return

    if (profilePicture !== defaultImageURL && profilePicture !== '') {
      setIsImageEditorOpen(true)
      setImageUploaded(true)
    } else {
      fileInputRef.current?.click()
    }
  }

  return (
    <>
      <div className='avatar-container'>
        {profilePicture ? (
          <div className='avatar-icon'>
            <img
              className={imgClassName}
              src={profilePicture}
              alt='avatar'
              onClick={handleAvatarClick}
            />
            {hasIcon && (
              <IconButton
                aria-label='change profile pic'
                className={iconButtonClassName}
                onClick={handleAvatarIconClick}
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
                onClick={handleAvatarIconClick}
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
      {!imageUploaded ? (
        <ImageEditorModal
          onOpen={isImageEditorOpen}
          onClose={handleCloseImageEditor}
          setImageUploaded={setImageUploaded}
        />
      ) : (
        <ProfilePreviewAvatar
          onOpen={isImageEditorOpen}
          onClose={handleCloseImageEditor}
          setImageUploaded={setImageUploaded}
        />
      )}
    </>
  )
}
