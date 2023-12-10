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
      <div className='team_member_card'>
        <div className='tmc_profile_cont'>
          <div className='tmc_profile_img_cont'>
            <TeamAvatar userProfileInfo={member} />
          </div>
          <div className='tmc_profile_info_cont'>
            <div className='tmc_profile_info'>
              <h2>
                {firstName} {lastName}
              </h2>
              <p>{role}</p>
            </div>
            <div className='tmc_profile_btns_cont'>
              <div className='tmc_profile_btn_cont'>
                <button className='tmc_profile_btn'>
                  <Link
                    className='tmc_link_pro_btn'
                    to={`/users/${memberId}`}
                    target='_blank'
                  >
                    <p>Profile</p>
                  </Link>
                </button>
              </div>
              {!isCurrentUser && (
                <div className='tmc_message_btn_cont'>
                  <button
                    className='tmc_message_btn'
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
