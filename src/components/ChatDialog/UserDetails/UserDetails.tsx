import { ChatUserAvatar } from '../ChatAvatar/ChatAvatar'
import './UserDetails.scss'
/**
 * @param title
 * @param description
 * @param {('small' | 'medium' | 'large' )} [avatarSize] - The size of the avatar; small, medium, or large.
 * @param userInfo - UserInterface
 * @param [className]
 */

export const UserDetails = ({
  title,
  description,
  avatarSize,
  userInfo,
  className = '',
}) => {
  return (
    <div className='avatar-details-container'>
      <ChatUserAvatar avatarSize={avatarSize} userInfo={userInfo} />
      <div className={`info-grid ${className}`}>
        <p className='title'>{title}</p>
        {description && <p className='description'>{description}</p>}
      </div>
    </div>
  )
}
