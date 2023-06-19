import { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timegrid from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import { selectProjectId } from 'utils/redux/slices/userSlice'

export const CalendarView = () => {
  const projectId = useSelector(selectProjectId)

  useEffect(() => {
    // set all events
    const fetchAllEvents = async () => {
      // const res = await fetchProjectCalendar(calendarId)
    }
  }, [])

  return (
    <div>
      <FullCalendar plugins={[timegrid]} initialView='timeGridWeek' />
    </div>
  )
}
