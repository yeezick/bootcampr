// import React, { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectMembersByRole } from 'utils/redux/slices/projectSlice'
import { TeamMemberCard } from './TeamMemberCard'
// import { TeamWithdrawal } from './TeamWithdrawal'
// import { IconButton } from '@mui/material'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import './TeamMembers.scss'

//TODO: Commented out code is for future implementation of team member withdrawal after post launch
export const TeamMembers = () => {
  const teamMembers = useAppSelector(selectMembersByRole)
  const authUser = useAppSelector(selectAuthUser)
  const loggedInUserId = authUser?._id
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // const [showWithdrawalButton, setShowWithdrawButton] = useState(false)
  // const [openModal, setOpenModal] = React.useState(false)
  // const openMenu = Boolean(anchorEl)

  // const handleOpenModal = () => setOpenModal(true)
  // const handleCloseModals = () => setShowWithdrawButton(false)
  // const handleCloseMenu = () => setAnchorEl(null)

  // const handleModalToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setShowWithdrawButton(!showWithdrawalButton)
  //   setAnchorEl(event.currentTarget)
  // }

  return (
    <div className='team_members'>
      <div className='tm_cont'>
        <div className='tm_header_cont'>
          <div className='tm_header'>
            <h1>Team Members</h1>
          </div>
          {/* <div className='tm_button_cont'>
            <IconButton
              aria-label='more'
              id='tm_open_modal'
              aria-controls={openMenu ? 'withdrawal_menu' : undefined}
              aria-expanded={openMenu ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleModalToggle}
            >
              <BsThreeDotsVertical size={24} />
            </IconButton>
            {showWithdrawalButton && (
              <TeamWithdrawal
                onOpenModal={handleOpenModal}
                openModal={openModal}
                onCloseAll={handleCloseModals}
                openMenu={openMenu}
                onCloseMenu={handleCloseMenu}
                anchorEl={anchorEl}
              />
            )}
          </div> */}
        </div>
        <TeamMemberInfo
          teamMembers={teamMembers}
          loggedInUserId={loggedInUserId}
        />
      </div>
    </div>
  )
}

const RenderRoleMembers = (roleMembers, role, loggedInUserId) => {
  const roleHeader =
    role === 'engineers'
      ? 'Software Engineers'
      : role === 'designers'
      ? 'UX Designers'
      : role

  const roleClassName =
    role === 'engineers' ? 'swe' : role === 'designers' ? 'uxd' : role

  return (
    <div className={`tmi_${roleClassName}_cont`} key={role}>
      <div className={`tmi_${roleClassName}_header_cont`}>
        <h1>{roleHeader}</h1>
      </div>
      <div className='tmi_card_cont'>
        {roleMembers.map(member => (
          <div key={member._id}>
            <TeamMemberCard member={member} loggedInUserId={loggedInUserId} />
          </div>
        ))}
      </div>
    </div>
  )
}

const TeamMemberInfo = ({ teamMembers, loggedInUserId }) => {
  return (
    <>
      <div className='team_members_info'>
        {Object.entries(teamMembers).map(([role, members]) =>
          Array.isArray(members)
            ? RenderRoleMembers(members, role, loggedInUserId)
            : null
        )}
      </div>
    </>
  )
}
