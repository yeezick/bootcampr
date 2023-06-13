import { useState } from 'react'
import { CalendarHeader, CalendarTabs, MeetingModal } from 'components/Calendar'
import 'components/Calendar/Calendar.scss'

export const Calendar = () => {
  const [visibleMeeting, toggleVisibleMeeting] = useState(false)
  const toggleMeetingModal = () => toggleVisibleMeeting(!visibleMeeting)

  return (
    <div className='calendar'>
      <CalendarHeader toggleMeetingModal={toggleMeetingModal} />
      <CalendarTabs />
      <MeetingModal
        toggleMeetingModal={toggleMeetingModal}
        visibleMeeting={visibleMeeting}
      />
    </div>
  )
}
