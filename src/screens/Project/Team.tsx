import { useState } from 'react'
import TeamBanner from '../../assets/Images/team-banner.png'
import { TeamMemberCard } from './TeamMemberCard'
import { BsThreeDotsVertical } from 'react-icons/bs'
import './Team.scss'
import { useSelector } from 'react-redux'
import { selectMembersByRole } from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'

//TODO: update withdrawal from project popup to be udner the three dots
//TODO: update confirmation withdrawal modal to popup at the center of the page
//TODO: fix styling to match Figma

export const Team = () => {
  const teamMembers = useSelector(selectMembersByRole)
  console.log(teamMembers)
  const authUser = useAppSelector(selectAuthUser)
  const loggedInUserId = authUser?._id
  const [showWithdrawalModal, setShowWithdrawModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const toggleModal = () => {
    setShowWithdrawModal(!showWithdrawalModal)
  }
  const handleCloseModals = () => {
    setShowWithdrawModal(false)
    setShowConfirmationModal(false)
  }
  return (
    <>
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
                {showWithdrawalModal && (
                  <section className='withdraw-modal-hidden'>
                    <div className='withdraw-modal'>
                      <button
                        className='withdraw-btn'
                        onClick={() => setShowConfirmationModal(true)}
                      >
                        <p className='withdraw-text'>Withdraw from Project</p>
                      </button>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
          {showConfirmationModal && (
            <section className='confirmation-modal-hidden'>
              <div className='confirmation-modal'>
                <div className='label-text'>
                  <p>
                    Just making sure, do you really want to withdraw from the
                    project?
                  </p>
                </div>
                <div className='confirmation-btns'>
                  <div>
                    <button
                      className='stay-btn'
                      onClick={() => handleCloseModals()}
                    >
                      Stay
                    </button>
                  </div>
                  <div>
                    <button className='withdraw-final-btn'>Withdraw</button>
                  </div>
                </div>
              </div>
            </section>
          )}
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
