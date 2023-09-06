import { useState } from 'react'
import { ProjectDetailsSidebar } from './ProjectDetailsSidebar'
import TeamBanner from '../../../assets/Image/team-header.png'
import { TeamMemberCard } from './TeamMemberCard'
import { BsThreeDotsVertical } from 'react-icons/bs'
// import { useSelector } from 'react-redux'
// import { selectProjectMembersAsTeam } from 'utils/redux/slices/projectSlice'

//TODO: get clarification fro UX team about modal popup designs
//TODO: how to map users based on role (SWE and UX)
//TODO: how to display user card without message button
//TODO: fix styling to match Figma
//TODO: bacground of withdraw modal

export const Team = () => {
  //teamMembers, loggedInUser
  const [showWithdrawalModal, setShowWithdrawModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const toggleModal = () => {
    setShowWithdrawModal(!showWithdrawalModal)
  }

  const handleCloseModals = () => {
    setShowWithdrawModal(false)
    setShowConfirmationModal(false)
  }

  // const projectMembersAsTeam = useSelector(selectProjectMembersAsTeam)
  // const designers = projectMembersAsTeam.filter(member => member.role === 'Designer')
  // const engineers = projectMembersAsTeam.filter(member => member.role === 'Engineer')

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

          <div className='role-container'>
            <div className='software-engineer-container'>
              <div className='swe-text-container'></div>
              <h1>Software Engineers</h1>
              <div className='team-member-card-container'>
                {/* {engineers.map((engineer, index) => (
                  <TeamMemberCard key={index} user={engineer} loggedInUser={loggedInUser} />
                ))} */}
                <TeamMemberCard />
              </div>
            </div>

            <div className='ux-designers-container'>
              <div className='ux-designers-text-container'></div>
              <h1>UX Designers</h1>
              <div className='team-member-card-container'>
                {/* {designers.map((designer, index) => (
                  <TeamMemberCard key={index} user={designer} loggedInUser={loggedInUser} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
