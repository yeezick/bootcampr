import Avatar from 'components/Avatar/Avatar'
import './Team.scss'

//TODO make team member card true to figma,
//TODO profile data functionality and how to link it to project
//TODO: create profile to open up new tab
//TODO add cursor pointer
//TODO fetch Avatar (Profile Picture) data

//add user props

export const TeamMemberCard = ({ member, loggedInUserId }) => {
  //TODO check projectId
  const isCurrentUser = member._id === loggedInUserId

  const handleProfileNavigation = () => {
    const userProfile = `/users/${member._id}`
    window.open(userProfile, '_blank')
  }

  return (
    <>
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
              <button onClick={handleProfileNavigation} className='profile-btn'>
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
    </>
  )
}
