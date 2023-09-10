import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'
import {
  convertGoogleEventsForCalendar,
  parseCalendarEventForMeetingInfo,
} from 'utils/helpers/calendarHelpers'
import { useAppDispatch } from 'utils/redux/hooks'
import {
  selectConvertedEventsAsArr,
  setDisplayedEvent,
  storeConvertedEvents,
} from 'utils/redux/slices/calendarSlice'
import { DisplayMeetingModal } from 'components/Calendar/MeetingModal/DisplayMeetingModal'

export const CalendarView = () => {
  const calendarId = useSelector(selectCalendarId)
  const convertedEventsAsArr = useSelector(selectConvertedEventsAsArr)
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
    if (calendarId) {
      fetchAllEvents()
    }
  }, [calendarId])

  const handleEventClick = e =>
    dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))

  return (
    <div>
      {isLoading ? (
        <p>LOADING</p>
      ) : (
        <FullCalendar
          events={convertedEventsAsArr}
          eventClick={handleEventClick}
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
      <DisplayMeetingModal />
    </div>
  )
}
