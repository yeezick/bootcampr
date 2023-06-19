import { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timegrid from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'

export const CalendarView = () => {
  const calendarId = useSelector(selectCalendarId)

  // todo: should calendar be hydrated with full team events or only events in user.meetings?
  useEffect(() => {
    // set all events
    const fetchAllEvents = async () => {
      const res = await fetchProjectCalendar(calendarId)
      console.log(calendarId)
      console.log('res', res)
    }
    fetchAllEvents()
  }, [])

  return (
    <div>
      <FullCalendar plugins={[timegrid]} initialView='timeGridWeek' />
    </div>
  )
}
