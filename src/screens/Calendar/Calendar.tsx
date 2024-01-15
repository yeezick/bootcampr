import { CalendarHeader, CalendarTabs, MeetingModal } from 'components/Calendar'
import 'components/Calendar/Calendar.scss'

export const CalendarScreen = () => {
  return (
    <div className='calendar'>
      <CalendarTabs />
      <MeetingModal />
    </div>
  )
}
