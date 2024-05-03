import { CalendarTabs, EditableMeetingModal } from 'screens/Calendar'
import './Calendar.scss'

export const CalendarScreen = () => {
  return (
    <div className='calendar'>
      <CalendarTabs />
      <EditableMeetingModal />
    </div>
  )
}
