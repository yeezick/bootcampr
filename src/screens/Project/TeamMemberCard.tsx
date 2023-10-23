import Avatar from 'components/Avatar/Avatar'
import './TeamMemberCard.scss'

export const TeamMemberCard = ({ member, loggedInUserId }) => {
  const isCurrentUser = member._id === loggedInUserId

  const handleProfileNavigation = () => {
    const userProfile = `/users/${member._id}`
    window.open(userProfile, '_blank')
  }

  return (
    <>
      <div className='team-member-card-container'>
        <div className='profile-container'>
          <div className='profile-img-container'>
            <Avatar />
          </div>
          <div className='profile-info-container'>
            <div className='profile-name'>
              <label>
                {member.firstName} {member.lastName}
              </label>
            </div>
            <div className='profile-role'>
              <p>{member.role}</p>
            </div>
            <div className='profile-buttons'>
              <div className='profile-btn-container'>
                <button
                  className='profile-btn'
                  onClick={handleProfileNavigation}
                >
                  Profile
                </button>
              </div>
              {isCurrentUser ? null : (
                <div className='message-btn-container'>
                  <button className='message-btn'>Message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
