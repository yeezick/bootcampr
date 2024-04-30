import { useEffect, useState } from 'react'
import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { fetchSandboxCalendar, fetchUserCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import {
  generateDayJs,
  parseCalendarEventForMeetingInfo,
  updateWeekDayNumber,
  updateWeekNumber,
} from 'utils/helpers/calendarHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectConvertedEventsAsArr,
  setDisplayedEvent,
  storeConvertedEvents,
  setModalDisplayStatus,
  selectTeamAvailabilityArr,
  storeTeamAvailability,
  clearTeamAvailability,
} from 'utils/redux/slices/calendarSlice'
import { DisplayMeetingModal } from 'screens/Calendar/MeetingModal'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import './CalendarView.scss'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { getTeamCommonAvailability } from 'utils/api'
import { TeamAvailability } from 'interfaces'
dayjs.extend(weekday)

export const CalendarView = () => {
  const calendarId = useAppSelector(selectCalendarId)
  const convertedEventsAsArr = useAppSelector(selectConvertedEventsAsArr)
  const userEmail = useAppSelector(selectUserEmail)
  const projectId = useAppSelector(selectProjectId)
  const teamAvailabilityArr = useAppSelector(selectTeamAvailabilityArr)
  const [eventFetchingStatus, setEventFetchingStatus] = useState('loading')
  const timeline = useAppSelector(selectProjectTimeline)
  const [weekNumber, setWeekNumber] = useState('')

  const firstDay = timeline.startDate
  const lastDay = generateDayJs(timeline.endDate)
    .weekday(7)
    .format('YYYY-MM-DD')
  const calendarRef = useRef(null)
  const dispatch = useAppDispatch()
  const projectSundayDates = [
    timeline.startDate,
    dayjs(timeline.startDate).add(7, 'day').format('YYYY-MM-DD'),
    dayjs(timeline.startDate).add(14, 'day').format('YYYY-MM-DD'),
    dayjs(timeline.startDate).add(21, 'day').format('YYYY-MM-DD'),
  ]

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

    const fetchTeamCommonAvailability = async () => {
      dispatch(clearTeamAvailability())
      const teamCommonAvailability = await getTeamCommonAvailability(projectId)
      const updatedTeamCommonAvail = await updateWeekDayNumber(
        teamCommonAvailability
      )

      for (let j = 0; j < projectSundayDates.length; j++) {
        for (const [key] of Object.entries(updatedTeamCommonAvail)) {
          const arr = updatedTeamCommonAvail[key]

          for (let i = 0; i < arr.length; i++) {
            const start = dayjs(`${projectSundayDates[j]} ${arr[i][0]}`)
              .day(Number(key))
              .format('YYYY-MM-DDTHH:mm:ss')
            const end = dayjs(`${projectSundayDates[j]} ${arr[i][1]}`)
              .day(Number(key))
              .format('YYYY-MM-DDTHH:mm:ss')

            const teamAvailability: TeamAvailability = {
              title: 'Team Availability',
              start: start,
              end: end,
              backgroundColor: '#E8F5E9',
              borderColor: '#388E3C',
              timeZone: 'America/New_York',
            }
            dispatch(storeTeamAvailability(teamAvailability))
          }
        }
      }
    }

    if (calendarId && userEmail) {
      fetchAllEvents()
      if (projectId) {
        fetchTeamCommonAvailability()
      }
    }
  }, [calendarId, userEmail])

  const handleEventClick = e => {
    if (e.event.title !== 'Team Availability') {
      dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))
    }
  }

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
            events={[...convertedEventsAsArr, ...teamAvailabilityArr]}
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
                text: '+ Create Meeting',
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
