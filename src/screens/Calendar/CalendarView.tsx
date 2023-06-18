import FullCalendar from '@fullcalendar/react'
import timegrid from '@fullcalendar/timegrid'

export const CalendarView = () => {
  return (
    <div>
      <FullCalendar plugins={[timegrid]} initialView='timeGridWeek' />
    </div>
  )
}
