import { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectMembersByRole } from 'utils/redux/slices/projectSlice'
import { TeamMemberCard } from './TeamMemberCard'
import { TeamWithdrawal } from './TeamWithdrawal'
import TeamBanner from '../../assets/Images/team-banner.png'
import { BsThreeDotsVertical } from 'react-icons/bs'
import './Team.scss'

export const Team = () => {
  const teamMembers = useAppSelector(selectMembersByRole)

  const authUser = useAppSelector(selectAuthUser)

  const loggedInUserId = authUser?._id

  const [showWithdrawalButton, setShowWithdrawButton] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const toggleModal = () => {
    setShowWithdrawButton(!showWithdrawalButton)
  }

  const handleCloseModals = () => {
    setShowWithdrawButton(false)
    setShowConfirmationModal(false)
  }

  return (
    <div className='team-container'>
      <div className='page-container'>
        <div className='header-container'>
          <img src={TeamBanner} alt='man working on computer'></img>
        </div>
        <div className='banner-box-container'>
          <div className='banner-text-container'>
            <div className='banner-text'>
              <h1>Team Members</h1>
              <button className='open-modal' onClick={toggleModal}>
                <BsThreeDotsVertical size={24} />
              </button>
              {showWithdrawalButton && (
                <TeamWithdrawal handleCloseModals={handleCloseModals} />
              )}
            </div>
          </div>
        </div>
        <TeamMemberInfo
          teamMembers={teamMembers}
          loggedInUserId={loggedInUserId}
        />
      </div>
    </div>
  )
}

const TeamMemberInfo = ({ teamMembers, loggedInUserId }) => {
  return (
    <>
      <div className='role-container'>
        <div className='software-engineer-container'>
          <div className='swe-text-container'>
            <label>Software Engineers</label>
          </div>
          <div className='team-card-container'>
            {teamMembers.engineers.map(member => (
              <div className='team-member-card-container' key={member._id}>
                <TeamMemberCard
                  member={member}
                  loggedInUserId={loggedInUserId}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='ux-designers-container'>
          <div className='ux-designers-text-container'>
            <label>UX Designers</label>
          </div>
          <div className='team-card-container'>
            {teamMembers.designers.map(member => (
              <div className='team-member-card-container' key={member._id}>
                <TeamMemberCard
                  member={member}
                  loggedInUserId={loggedInUserId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
