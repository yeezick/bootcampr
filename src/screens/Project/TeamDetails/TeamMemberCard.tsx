import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import { handleMemberMessageClick } from 'utils/helpers/messagingHelpers'
import './TeamMemberCard.scss'

export const TeamMemberCard = ({ member, loggedInUserId }) => {
  const {
    firstName,
    lastName,
    role,
    _id: memberId,
    email,
    profilePicture,
  } = member
  const isCurrentUser = memberId === loggedInUserId
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const handleChatMemberClick = () => {
    handleMemberMessageClick({
      firstName,
      lastName,
      memberId,
      email,
      profilePicture,
      authUser,
      dispatch,
    })
  }

  return (
    <>
      <div className='team-member-card'>
        <div className='tmc-profile-cont'>
          <div className='tmc-profile-img-cont'>
            <TeamAvatar userProfileInfo={member} />
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
                    onClick={handleChatMemberClick}
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
