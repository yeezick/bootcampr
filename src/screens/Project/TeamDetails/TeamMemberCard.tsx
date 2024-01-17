import { Link } from 'react-router-dom'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import './TeamMemberCard.scss'

export const TeamMemberCard = ({ member, loggedInUserId }) => {
  const { firstName, lastName, role, _id: memberId } = member
  const isCurrentUser = memberId === loggedInUserId

  const handleMemberMessageClick = () => {
    //TODO: Create logic for team member message button to open chat modal with that team member directly
    console.log('handleMemberMessageClick')
  }

  return (
    <>
      <div className='team-member-card'>
        <div className='tmc-profile-cont'>
          <div className='tmc-profile-img-cont'>
            <TeamAvatar userId={memberId} />
          </div>
          <div className='tmc-profile-info-cont'>
            <div className='tmc-profile-info'>
              <h2>
                {firstName} {lastName}
              </h2>
              <p>{role}</p>
            </div>
            <div className='tmc-profile-btns-cont'>
              <div className='tmc-profile-btn-cont'>
                <button className='tmc-profile-btn'>
                  <Link
                    className='tmc-link-pro-btn'
                    to={`/users/${memberId}`}
                    target='_blank'
                  >
                    <p>Profile</p>
                  </Link>
                </button>
              </div>
              {!isCurrentUser && (
                <div className='tmc-message-btn-cont'>
                  <button
                    className='tmc-message-btn'
                    onClick={handleMemberMessageClick}
                  >
                    Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
