import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppDispatch } from 'utils/redux/hooks'
import { setModalDisplayStatus } from 'utils/redux/slices/calendarSlice'

export const CalendarHeader = () => {
  const dispatch = useAppDispatch()
  const openMeetingModal = () => dispatch(setModalDisplayStatus('create'))

  return (
    <div className='calendar-header'>
      <div className='header-title'>
        <h2>Calendar</h2>
      </div>
      <div className='header-button'>
        <PurpleButton onClick={openMeetingModal} variant='contained'>
          + Create Meeting
        </PurpleButton>
      </div>
    </div>
  )
}

const PurpleButton = styled(Button)(() => ({
  backgroundColor: '#8048C8',
  marginRight: '42px',
}))