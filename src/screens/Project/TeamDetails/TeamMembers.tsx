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
    <div className='team-members'>
      <div className='tm-cont'>
        {/* <WithdrawalEllipsis /> */}
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
    <div className={`tmi-${roleClassName}-cont`} key={role}>
      <div className={`tmi-${roleClassName}-header-cont`}>
        <h1>{roleHeader}</h1>
      </div>
      <div className='tmi-card-cont'>
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
      <div className='team-members-info'>
        {Object.entries(teamMembers).map(([role, members]) =>
          Array.isArray(members)
            ? RenderRoleMembers(members, role, loggedInUserId)
            : null
        )}
      </div>
    </>
  )
}

const WithdrawalEllipsis = () => {
  return (
    <div className='withdraw'>
      {/* <IconButton
        aria-label='more'
        id='tm-open-modal'
        aria-controls={openMenu ? 'withdrawal-menu' : undefined}
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
      )} */}
    </div>
  )
}
