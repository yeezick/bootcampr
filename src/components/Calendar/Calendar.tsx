import { useState } from 'react'
import { Box, Button, Modal, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CalendarTabs } from './CalendarTabs'
import './Calendar.scss'

const PurpleButon = styled(Button)(() => ({
  backgroundColor: '#8048C8',
  marginRight: '42px',
}))

export const Calendar = () => {
  const [visibleMeeting, toggleVisibleMeeting] = useState(false)
  const toggleMeetingModal = () => toggleVisibleMeeting(!visibleMeeting)

  return (
    <div className='calendar'>
      <CalendarHeader toggleMeetingModal={toggleMeetingModal} />
      <CalendarBody />
      <MeetingModal
        toggleMeetingModal={toggleMeetingModal}
        visibleMeeting={visibleMeeting}
      />
    </div>
  )
}

const CalendarHeader = ({ toggleMeetingModal }) => {
  return (
    <div className='calendar-header'>
      <div className='header-title'>
        <h2>Calendar</h2>
      </div>
      <div className='header-button'>
        <PurpleButon onClick={toggleMeetingModal} variant='contained'>
          Create Meeting
        </PurpleButon>
      </div>
    </div>
  )
}

const CalendarBody = () => {
  return (
    <div className='calendar-body'>
      <CalendarTabs />
      <div className='body-content'>Content</div>
    </div>
  )
}

// Todo: Disable auto-close onBlur of modal
const MeetingModal = ({ toggleMeetingModal, visibleMeeting }) => {
  return (
    <Modal open={visibleMeeting} onClose={toggleMeetingModal}>
      <Box sx={modalStyles}>
        <p>Create a new meeting</p>
      </Box>
    </Modal>
  )
}

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
