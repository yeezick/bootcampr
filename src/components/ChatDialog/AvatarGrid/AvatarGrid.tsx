import { useEffect, useState } from 'react'
import { FiCamera } from 'react-icons/fi'
import './AvatarGrid.scss'

export const AvatarGrid = ({ pictures, avatarSize, avatarType }) => {
  const [profilePictures, setProfilePictures] = useState<string | []>([])
  const [avatarClassName, setAvatarClassName] = useState('')

  useEffect(() => {
    if (pictures && pictures.length !== 0) {
      setProfilePictures(pictures)

      if (avatarType === 'grid') {
        setAvatarClassName(`group-photo-container ${avatarSize}`)
      } else if (avatarType === 'single') {
        setAvatarClassName(`avatar-grid ${avatarSize}`)
      }
    }
  }, [avatarType, pictures])

  const gridClassName = () => {
    if (pictures.length === 2) {
      return ['left-column', 'right-column']
    } else if (pictures.length === 3) {
      return ['merged-grid', '']
    } else {
      return ['', '', '', '']
    }
  }

  return avatarType === 'grid' ? (
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
