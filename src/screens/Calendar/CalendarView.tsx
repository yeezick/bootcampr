import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { fetchUserCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import { parseCalendarEventForMeetingInfo } from 'utils/helpers/calendarHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectConvertedEventsAsArr,
  setDisplayedEvent,
  storeConvertedEvents,
  setModalDisplayStatus,
} from 'utils/redux/slices/calendarSlice'
import { DisplayMeetingModal } from 'screens/Calendar/MeetingModal'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import './CalendarView.scss'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

export const CalendarView = () => {
  const calendarId = useAppSelector(selectCalendarId)
  const convertedEventsAsArr = useAppSelector(selectConvertedEventsAsArr)
  const userEmail = useAppSelector(selectUserEmail)
  const [eventFetchingStatus, setEventFetchingStatus] = useState('loading')
  const timeline = useAppSelector(selectProjectTimeline)
  //use startDate and endDate for validRange in FullCalendar
  dayjs.extend(weekday)
  const firstDay = dayjs(timeline.startDate).weekday(0).format('YYYY-MM-DD')
  const lastDay = dayjs(timeline.endDate).weekday(7).format('YYYY-MM-DD')

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchAllEvents = async () => {
      const googleCalendarEvents = await fetchUserCalendar(
        calendarId,
        userEmail
      )

      if (!googleCalendarEvents) {
        setEventFetchingStatus('error')
      } else {
        setEventFetchingStatus('success')
        dispatch(storeConvertedEvents(googleCalendarEvents))
      }
    }

    if (calendarId) {
      fetchAllEvents()
    }
  }, [calendarId])

  const handleEventClick = e =>
    dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))

  switch (eventFetchingStatus) {
    case 'success':
      return (
        <div className='calendar-container'>
          <FullCalendar
            events={convertedEventsAsArr}
            eventClick={handleEventClick}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: true,
            }}
            headerToolbar={{
              start: 'today prev myCustomTitle next',
              center: '',
              end: 'myCustomButton',
            }}
            allDaySlot={false}
            initialView='timeGridWeek'
            nowIndicator={true}
            plugins={[dayGridPlugin, timeGridPlugin]}
            validRange={{
              start: firstDay,
              end: lastDay,
            }}
            customButtons={{
              myCustomButton: {
                text: '+ Creating Meeting',
                click: () => dispatch(setModalDisplayStatus('create')),
              },
              myCustomTitle: {
                text: 'Week',
              },
            }}
          />
          <DisplayMeetingModal />
        </div>
      )

    case 'error':
      return (
        <div>
          <h2> Error loading events or none exist.</h2>
        </div>
      )

    default:
      return <p>LOADING</p>
  }
}
