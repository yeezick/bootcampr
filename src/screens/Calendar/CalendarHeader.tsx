import { useAppDispatch } from 'utils/redux/hooks'
import { setModalDisplayStatus } from 'utils/redux/slices/calendarSlice'

export const CalendarHeader = () => {
  return (
    <div className='calendar-header'>
      <div className='header-title'>
        <h2>Calendar</h2>
      </div>
    </div>
  )
}
