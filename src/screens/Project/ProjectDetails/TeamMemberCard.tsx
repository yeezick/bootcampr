import { useNavigate } from 'react-router-dom'
import Avatar from 'components/Avatar/Avatar'
import './Team.scss'

//TODO make team member card true to figma,
//TODO profile data functionality and how to link it to project,

//add user props

export const TeamMemberCard = ({ member, loggedInUserId }) => {
  const navigate = useNavigate()
  const isCurrentUser = member._id === loggedInUserId

  const handleProfileNavigation = () => {
    navigate(`/users/${member._id}`) //TODO: create new route to navigate to team member profile
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
