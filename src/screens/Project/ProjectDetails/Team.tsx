import { useState } from 'react'
import TeamBanner from '../../../assets/Image/team-header.png'
import { TeamMemberCard } from './TeamMemberCard'
import { BsThreeDotsVertical } from 'react-icons/bs'
import './Team.scss'
import { useSelector } from 'react-redux'
import { selectProjectMembersByRole } from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { TeamWithdrawal } from './TeamWithdrawal'

//TODO: fix modal styling
//TODO: fix styling to match Figma, fix page layout

export const Team = () => {
  const teamMembers = useSelector(selectProjectMembersByRole)

  const authUser = useAppSelector(selectAuthUser)
  const loggedInUserId = authUser?._id

  const [showWithdrawalModal, setShowWithdrawModal] = useState(false)

  const toggleModal = () => {
    setShowWithdrawModal(!showWithdrawalModal)
  }

  const handleCloseModals = () => {
    setShowWithdrawModal(false)
  }

  return (
    <>
      <div className='team-container'>
        <div className='team-page-container'>
          <div className='team-header-container'>
            <img src={TeamBanner} alt='man working on computer'></img>
          </div>
          <div className='team-banner-box-container'>
            <div className='team-banner-text-container'>
              <div className='team-banner-text'>
                <h1>Team Members</h1>
                <button className='open-modal' onClick={toggleModal}>
                  <BsThreeDotsVertical size={24} className='three-dots' />
                </button>
                {showWithdrawalModal && (
                  <section className='withdraw-modal-hidden'>
                    <div className='withdraw-modal'>
                      <TeamWithdrawal handleCloseModals={handleCloseModals} />
                    </div>
                  </section>
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
    </>
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
