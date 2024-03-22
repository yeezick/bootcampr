import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import './UserDetails.scss'
/**
 * @param title
 * @param description
 * @param {('small' | 'medium' | 'large' )} [avatarSize] - The size of the avatar; small, medium, or large.
 * @param userId
 * @param [className]
 */

export const UserDetails = ({
  title,
  description,
  avatarSize,
  userId,
  className = '',
}) => {
  return (
    <div className='avatar-details-container'>
      <TeamAvatar size={avatarSize} userId={userId} />
      <div className={`info-grid ${className}`}>
        <p className='title'>{title}</p>
        {description && <p className='description'>{description}</p>}
      </div>
    </div>
  )
}
