import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'
import { convertGoogleEventsForCalendar } from 'utils/helpers/calendarHelpers'
import { useAppDispatch } from 'utils/redux/hooks'
import {
  selectArrayOfConvertedEvents,
  storeConvertedEvents,
} from 'utils/redux/slices/calendarSlice'
export const CalendarView = () => {
  const calendarId = useSelector(selectCalendarId)
  const convertedEventsAsArr = useSelector(selectArrayOfConvertedEvents)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()

  // TODO: only hydrate calendar with events in user.meetings
  useEffect(() => {
    const fetchAllEvents = async () => {
      const googleCalendarEvents = await fetchProjectCalendar(calendarId)
      setIsLoading(false)
      dispatch(
        storeConvertedEvents(
          convertGoogleEventsForCalendar(googleCalendarEvents)
        )
      )
    }
    fetchAllEvents()
  }, [calendarId])

  /** Context
   * Update calendar view with new events added to calendar from MeetingModal.
   * *** Might not be needed anymore?
   */
  // useEffect(() => {
  //   dispatch(storeConvertedEvents(convertGoogleEventsForCalendar(events)))
  // }, [events])

  const handleEventClick = () => {}

  return (
    <div>
      {isLoading ? (
        <p>LOADING</p>
      ) : (
        <FullCalendar
          events={convertedEventsAsArr}
          // eventClick={}
          headerToolbar={{
            start: 'dayGridMonth timeGridWeek today',
            center: 'title',
            end: 'prev next',
          }}
          initialView='timeGridWeek'
          nowIndicator={true}
          plugins={[dayGridPlugin, timeGridPlugin]}
        />
      )}
    </div>
  )
}
