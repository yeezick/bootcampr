import { useEffect, useState } from 'react'
import { useRef } from 'react'
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
  const [weekNumber, setWeekNumber] = useState(1)
  //use startDate and endDate for validRange in FullCalendar
  dayjs.extend(weekday)
  const firstDay = dayjs(timeline.startDate).weekday(0).format('YYYY-MM-DD')
  const lastDay = dayjs(timeline.endDate).weekday(7).format('YYYY-MM-DD')
  const calendarRef = useRef(null)
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
            ref={calendarRef}
            events={convertedEventsAsArr}
            //firstDay={6}
            eventClick={handleEventClick}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: true,
            }}
            headerToolbar={{
              start: 'title today customPrev weekTitle customNext',
              center: '',
              end: 'createMeeting',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            allDaySlot={false}
            initialView='timeGridWeek'
            nowIndicator={true}
            plugins={[dayGridPlugin, timeGridPlugin]}
            validRange={
              {
                // start: firstDay,
                // end: lastDay,
              }
            }
            customButtons={{
              createMeeting: {
                text: '+ Creating Meeting',
                click: () => dispatch(setModalDisplayStatus('create')),
              },
              weekTitle: {
                text: `Week ${weekNumber}`,
              },
              customNext: {
                icon: 'chevron-right',
                click: () => {
                  const calendarApi = calendarRef.current.getApi()
                  setWeekNumber(weekNumber + 1)
                  calendarApi.next()
                },
              },
              customPrev: {
                icon: 'chevron-left',
                click: () => {
                  const calendarApi = calendarRef.current.getApi()
                  setWeekNumber(weekNumber - 1)
                  calendarApi.prev()
                },
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
