import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'
import { convertGoogleEventsForCalendar } from 'utils/helpers/calendarHelpers'

export const CalendarView = ({ events, setEvents }) => {
  const calendarId = useSelector(selectCalendarId)
  const [isLoading, setIsLoading] = useState(true)
  const [convertedEvents, setConvertedEvents] = useState([])

  // TODO: only hydrate calendar with events in user.meetings
  useEffect(() => {
    const fetchAllEvents = async () => {
      const res = await fetchProjectCalendar(calendarId)
      setEvents(res)
      setConvertedEvents(convertGoogleEventsForCalendar(res))
      setIsLoading(false)
    }
    fetchAllEvents()
  }, [calendarId])

  useEffect(() => {
    setConvertedEvents(convertGoogleEventsForCalendar(events))
  }, [events])

  return (
    <div>
      {isLoading ? (
        <p>LOADING</p>
      ) : (
        <FullCalendar
          headerToolbar={{
            start: 'dayGridMonth timeGridWeek today',
            center: 'title',
            end: 'prev next',
          }}
          events={convertedEvents}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
        />
      )}
    </div>
  )
}
