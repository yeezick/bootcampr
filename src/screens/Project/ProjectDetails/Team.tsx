import { useState } from 'react'
import { ProjectDetailsSidebar } from './ProjectDetailsSidebar'
import TeamBanner from '../../../assets/Image/team-header.png'
import { TeamMemberCard } from './TeamMemberCard'
import { BsThreeDotsVertical } from 'react-icons/bs'
import './Team.scss'
import { useSelector } from 'react-redux'
import { selectProjectMembersByRole } from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'

//TODO: get clarification fro UX team about modal popup designs
//TODO: how to display user card without message button (conditional - if user)
//TODO: fix styling to match Figma
//TODO: background of withdraw modal

export const Team = () => {
  const teamMembers = useSelector(selectProjectMembersByRole)
  console.log(teamMembers)

  const authUser = useAppSelector(selectAuthUser)
  const loggedInUserId = authUser?._id
  console.log(loggedInUserId)

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
        <ProjectDetailsSidebar />
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
                <div>
                  <button onClick={() => handleCloseModals()}>Stay</button>
                </div>
                <div>
                  <button>Withdraw</button>
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
          <div className='swe-text-container'></div>
          <h1>Software Engineers</h1>
          {teamMembers.engineers.map(member => (
            <div className='team-member-card-container' key={member._id}>
              <TeamMemberCard member={member} loggedInUserId={loggedInUserId} />
            </div>
          ))}
        </div>
        <div className='ux-designers-container'>
          <div className='ux-designers-text-container'></div>
          <h1>UX Designers</h1>
          {teamMembers.designers.map(member => (
            <div className='team-member-card-container' key={member._id}>
              <TeamMemberCard member={member} loggedInUserId={loggedInUserId} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
