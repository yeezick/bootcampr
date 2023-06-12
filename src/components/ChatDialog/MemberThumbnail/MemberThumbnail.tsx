import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import './MemberThumbnail.scss'

export const MemberThumbnail = ({ user }) => {
  const { firstName, lastName, role, profilePicture } = user

  return (
    <div className='thumbnail-container'>
      <AvatarGrid
        pictures={profilePicture}
        avatarSize={'medium'}
        chatType={'private'}
      />
      <div className='member-info-grid'>
        <h5>
          {firstName} {lastName}
        </h5>
        <p>{role}</p>
      </div>
    </div>
  )
}
