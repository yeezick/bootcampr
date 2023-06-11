import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CalendarHeader = ({ toggleMeetingModal }) => {
  return (
    <div className='calendar-header'>
      <div className='header-title'>
        <h2>Calendar</h2>
      </div>
      <div className='header-button'>
        <PurpleButon onClick={toggleMeetingModal} variant='contained'>
          + Create Meeting
        </PurpleButon>
      </div>
    </div>
  )
}

const PurpleButon = styled(Button)(() => ({
  backgroundColor: '#8048C8',
  marginRight: '42px',
}))
