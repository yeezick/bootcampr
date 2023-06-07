import { FiCamera } from 'react-icons/fi'
import './AvatarGrid.scss'
import { useEffect, useState } from 'react'

export const AvatarGrid = ({ picturesArray, avatarSize, chatType }) => {
  const [profilePictures, setProfilePictures] = useState([])
  const [avatarClassName, setAvatarClassName] = useState('')

  useEffect(() => {
    if (picturesArray.length !== 0 && chatType === 'group') {
      setProfilePictures(picturesArray)
      setAvatarClassName(`group-photo-container ${avatarSize}`)
    }

    if (picturesArray.length !== 0 && chatType === 'private') {
      setProfilePictures(picturesArray)
      setAvatarClassName(`avatar-grid ${avatarSize}`)
    }
  }, [])

  const gridClassName = () => {
    if (picturesArray.length === 2) {
      return ['left-column', 'right-column']
    } else if (picturesArray.length === 3) {
      return ['merged-grid', '']
    } else {
      return ['', '', '', '']
    }
  }

  return chatType === 'group' ? (
    <GroupAvatar
      profilePictures={profilePictures}
      avatarSize={avatarSize}
      avatarClassName={avatarClassName}
      gridClassName={gridClassName}
    />
  ) : (
    <PrivateAvatar
      profilePictures={profilePictures}
      avatarClassName={avatarClassName}
    />
  )
}

const PrivateAvatar = ({ profilePictures, avatarClassName }) => {
  return (
    <div className={avatarClassName}>
      <img src={profilePictures} alt='avatar' key={profilePictures} />
    </div>
  )
}

const GroupAvatar = ({
  profilePictures,
  avatarSize,
  avatarClassName,
  gridClassName,
}) => {
  return (
    <div className={avatarClassName}>
      <div className='photo-grid'>
        {profilePictures.map((picture, index) => (
          <div key={picture} className={gridClassName()[index]}>
            <img src={picture} alt='group' />
          </div>
        ))}
        {avatarSize === 'large' && <CameraUploadIcon />}
      </div>
    </div>
  )
}

const CameraUploadIcon = () => {
  return (
    <div className='camera-icon'>
      <FiCamera />
    </div>
  )
}
