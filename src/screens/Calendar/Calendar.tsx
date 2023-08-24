import { useState } from 'react'
import { CalendarHeader, CalendarTabs, MeetingModal } from 'components/Calendar'
import 'components/Calendar/Calendar.scss'
import { CalendarEvent } from 'interfaces/CalendarInterface'

export const CalendarScreen = () => {
  const [visibleMeeting, toggleVisibleMeeting] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const toggleMeetingModal = () => toggleVisibleMeeting(!visibleMeeting)

  return (
    <div className='calendar'>
      <CalendarHeader toggleMeetingModal={toggleMeetingModal} />
      <CalendarTabs events={events} setEvents={setEvents} />
      <MeetingModal
        events={events}
        setEvents={setEvents}
        toggleMeetingModal={toggleMeetingModal}
        visibleMeeting={visibleMeeting}
      />
    </div>
  )
}
