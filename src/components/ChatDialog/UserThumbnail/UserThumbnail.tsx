import { AvatarGrid } from 'components/ChatDialog/AvatarGrid/AvatarGrid'
import './UserThumbnail.scss'

interface UserThumbnailInterface {
  title: string
  description: string
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
  return (
    <div className={`thumbnail-container ${className}`}>
      <AvatarGrid
        pictures={profilePicture}
        avatarSize={avatarSize}
        avatarType={avatarType}
      />
      <div className='info-grid'>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  )
}
