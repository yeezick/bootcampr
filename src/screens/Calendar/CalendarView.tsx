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
  formatAvailabilityDate,
  generateDayJs,
  generateTeamAvailabilityEvent,
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
import { SecondaryButton } from 'components/Buttons'
import { DisplayMeetingModal } from 'screens/Calendar/MeetingModal'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { getTeamCommonAvailability } from 'utils/api'
import './CalendarView.scss'
dayjs.extend(weekday)
dayjs.extend(utc)
dayjs.extend(timezone)

export const CalendarView = () => {
  const calendarId = useAppSelector(selectCalendarId)
  const convertedEventsAsArr = useAppSelector(selectConvertedEventsAsArr)
  const userEmail = useAppSelector(selectUserEmail)
  const projectId = useAppSelector(selectProjectId)
  const teamAvailabilityArr = useAppSelector(selectTeamAvailabilityArr)
  const [eventFetchingStatus, setEventFetchingStatus] = useState('loading')
  const timeline = useAppSelector(selectProjectTimeline)
  const [weekNumber, setWeekNumber] = useState('')
  const [isTodayButtonEnabled, setIsTodayButtonEnabled] = useState(true)
  const [isProjectStartConfirmed, setIsProjectStartConfirmed] = useState(false)

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
    try {
      dispatch(clearTeamAvailability())
      const teamCommonAvailability = await getTeamCommonAvailability(projectId)

      if (!teamCommonAvailability) {
        console.error('Team common availability not found.')
        return
      }

      const updatedTeamCommonAvail = await updateWeekDayNumber(
        teamCommonAvailability
      )

      const teamAvailabilities = []

      projectSundayDates.forEach(sundayDate => {
        Object.entries(updatedTeamCommonAvail).forEach(
          ([dayOfWeek, availability]) => {
            ;(availability as any[]).forEach(([startTime, endTime]) => {
              const { start, end } = formatAvailabilityDate(
                sundayDate,
                dayOfWeek,
                startTime,
                endTime
              )
              const teamAvailability = generateTeamAvailabilityEvent(start, end)
              teamAvailabilities.push(teamAvailability)
            })
          }
        )
      })
      dispatch(storeTeamAvailability(teamAvailabilities))
    } catch (error) {
      console.error('Error fetching team availability:', error)
    }
  }

  const checkButtonStatus = () => {
    const calendarApi = calendarRef.current.getApi()
    const currentDate = generateDayJs(calendarApi.today()).format('YYYY-MM-DD')
    const validStart = generateDayJs(firstDay).format('YYYY-MM-DD')
    const validEnd = generateDayJs(lastDay).format('YYYY-MM-DD')
    setIsTodayButtonEnabled(!isProjectStartConfirmed)
    setIsProjectStartConfirmed(
      currentDate >= validStart && currentDate <= validEnd
    )
  }

  useEffect(() => {
    if (calendarId && userEmail) {
      fetchAllEvents()
      if (projectId) {
        fetchTeamCommonAvailability()
      }
    }

    if (calendarRef.current) {
      checkButtonStatus()
    }
  }, [
    calendarId,
    userEmail,
    projectId,
    eventFetchingStatus,
    isProjectStartConfirmed,
  ])

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

  const handleTodayButtonClick = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.today()
  }

  const handleProjectStartButtonClick = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(firstDay)
  }

  switch (eventFetchingStatus) {
    case 'success':
      return (
        <div className='calendar-container'>
          {isProjectStartConfirmed && (
            <SecondaryButton
              onClick={handleProjectStartButtonClick}
              label='Project Start Date'
              style={{
                top: '82px',
                left: '0px',
                padding: '7px 15px',
                textTransform: 'capitalize',
              }}
            />
          )}
          {!isProjectStartConfirmed && isTodayButtonEnabled && (
            <SecondaryButton
              onClick={handleTodayButtonClick}
              label='Today'
              style={{
                top: '83px',
                left: '0px',
                padding: '7px 16px',
              }}
            />
          )}
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
              start: `title ${
                isTodayButtonEnabled ? 'today' : 'projectStart'
              } prev weekTitle next`,
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
                text: '+ Create meeting',
                click: () => dispatch(setModalDisplayStatus('create')),
              },
              weekTitle: {
                text: `Week ${weekNumber}`,
              },
              projectStart: {
                text: 'Project Start Date',
              },
              today: {
                text: 'Today',
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
