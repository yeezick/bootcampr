import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'
import { convertGoogleEventsForCalendar } from 'utils/helpers/stateHelpers'
import { CalendarEvent } from 'interfaces/CalendarInterface'

export const CalendarView = () => {
  const calendarId = useSelector(selectCalendarId)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [viewMonth, setViewMonth] = useState(false)
  // todo: should calendar be hydrated with full team events or only events in user.meetings?
  useEffect(() => {
    const fetchAllEvents = async () => {
      const res = await fetchProjectCalendar(calendarId)
      setEvents(convertGoogleEventsForCalendar(res))
    }
    fetchAllEvents()
  }, [])

  return (
    <div>
      <FullCalendar
        headerToolbar={{
          start: 'dayGridMonth timeGridWeek today',
          center: 'title',
          end: 'prev next',
        }}
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
      />
    </div>
  )
}
