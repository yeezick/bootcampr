import { useEffect, useState } from 'react'
import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { fetchUserCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import {
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
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { getTeamCommonAvailability } from 'utils/api'

export const CalendarView = () => {
  const calendarId = useAppSelector(selectCalendarId)
  const convertedEventsAsArr = useAppSelector(selectConvertedEventsAsArr)
  const userEmail = useAppSelector(selectUserEmail)
  const projectId = useAppSelector(selectProjectId)
  const [eventFetchingStatus, setEventFetchingStatus] = useState('loading')
  const timeline = useAppSelector(selectProjectTimeline)
  const [weekNumber, setWeekNumber] = useState('')

  dayjs.extend(weekday)

  const firstDay = timeline.startDate
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

    const fetchTeamCommonAvailability = async () => {
      const teamCommonAvailability = await getTeamCommonAvailability(projectId)
      console.log(teamCommonAvailability)

      // for(const [key, value] of Object.entries(teamCommonAvailability)){
      //   console.log(`Key: ${key}, Value: ${value}`)
      // }
      Object.keys(teamCommonAvailability).forEach(key => {
        let DOTWNumber
        switch (key) {
          case 'SUN':
            teamCommonAvailability[0] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
          case 'MON':
            teamCommonAvailability[1] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
          case 'TUE':
            teamCommonAvailability[2] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
          case 'WED':
            teamCommonAvailability[3] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
          case 'THU':
            teamCommonAvailability[4] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
          case 'FRI':
            teamCommonAvailability[5] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
          case 'SAT':
            teamCommonAvailability[6] = teamCommonAvailability[key]
            delete teamCommonAvailability[key]
            break
        }
      })

      console.log(teamCommonAvailability)
    }

    if (projectId) {
      fetchTeamCommonAvailability()
    }
  }, [calendarId])

  const handleEventClick = e =>
    dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))

  const renderWeekNumber = () => {
    setTimeout(() => {
      const calendarApi = calendarRef.current.getApi()
      const sundayDate = dayjs(calendarApi.getDate())
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
