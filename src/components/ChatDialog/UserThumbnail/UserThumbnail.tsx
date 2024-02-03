import { AvatarGrid } from 'components/ChatDialog/AvatarGrid/AvatarGrid'
import './UserThumbnail.scss'

interface UserThumbnailInterface {
  title: string
  description?: string
  profilePicture: string
  avatarSize: 'small' | 'medium' | 'large'
  avatarType: 'grid' | 'single'
  className?: string
}
export const UserThumbnail = ({
  title,
  description,
  profilePicture,
  avatarSize,
  avatarType, //grid or single
  className,
}: UserThumbnailInterface) => {
  const customClassName = className || ''

  return (
    <div className='thumbnail-container'>
      <AvatarGrid
        pictures={profilePicture}
        avatarSize={avatarSize}
        avatarType={avatarType}
      />
      <div className={`info-grid ${customClassName}`}>
        <p className='title'>{title}</p>
        {description && <p className='description'>{description}</p>}
      </div>
    </div>
  )
}
