import { useEffect, useState } from 'react'
import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { fetchSandboxCalendar, fetchUserCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import {
  generateDayJs,
  parseCalendarEventForMeetingInfo,
  updateWeekNumber,
} from 'utils/helpers/calendarHelpers'
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

export const CalendarView = () => {
  const calendarId = useAppSelector(selectCalendarId)
  const convertedEventsAsArr = useAppSelector(selectConvertedEventsAsArr)
  const userEmail = useAppSelector(selectUserEmail)
  const [eventFetchingStatus, setEventFetchingStatus] = useState('loading')
  const timeline = useAppSelector(selectProjectTimeline)
  const [weekNumber, setWeekNumber] = useState('')

  const firstDay = timeline.startDate
  const lastDay = generateDayJs(timeline.endDate)
    .weekday(7)
    .format('YYYY-MM-DD')
  const calendarRef = useRef(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchAllEvents = async () => {
      let googleCalendarEvents = []
      if (calendarId === 'sandbox') {
        googleCalendarEvents = await fetchSandboxCalendar(timeline)
      } else {
        googleCalendarEvents = await fetchUserCalendar(calendarId, userEmail)
      }

      if (!googleCalendarEvents) {
        setEventFetchingStatus('error')
        return
      }

      setEventFetchingStatus('success')
      dispatch(storeConvertedEvents(googleCalendarEvents))
    }

    if (calendarId) {
      fetchAllEvents()
    }
  }, [calendarId, userEmail])

  const handleEventClick = e =>
    dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))

  const renderWeekNumber = () => {
    setTimeout(() => {
      const calendarApi = calendarRef.current.getApi()
      const sundayDate = generateDayJs(calendarApi.getDate())
        .day(0)
        .format('YYYY-MM-DD')
      updateWeekNumber(sundayDate, firstDay, setWeekNumber)
    })
  }

  switch (eventFetchingStatus) {
    case 'success':
      return (
        <div className='calendar-container'>
          <FullCalendar
            ref={calendarRef}
            datesSet={renderWeekNumber}
            events={convertedEventsAsArr}
            eventClick={handleEventClick}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: true,
            }}
            headerToolbar={{
              start: 'title today prev weekTitle next',
              center: '',
              end: 'createMeeting',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            allDaySlot={false}
            initialView='timeGridWeek'
            nowIndicator={true}
            plugins={[dayGridPlugin, timeGridPlugin]}
            validRange={{
              start: firstDay,
              end: lastDay,
            }}
            customButtons={{
              createMeeting: {
                text: '+ Creating Meeting',
                click: () => dispatch(setModalDisplayStatus('create')),
              },
              weekTitle: {
                text: `Week ${weekNumber}`,
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
