import { useEffect, useState } from 'react'
import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { fetchSandboxCalendar, fetchUserCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectProjectCompleted,
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import {
  formatAvailabilityDate,
  generateDayJs,
  generateTeamAvailabilityEvent,
  getProjectDateRanges,
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
import { getTeamCommonAvailability } from 'utils/api'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import './CalendarView.scss'
dayjs.extend(weekday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const CalendarView = () => {
  const dispatch = useAppDispatch()
  const calendarRef = useRef(null)
  const calendarId = useAppSelector(selectCalendarId)
  const convertedEventsAsArr = useAppSelector(selectConvertedEventsAsArr)
  const userEmail = useAppSelector(selectUserEmail)
  const projectId = useAppSelector(selectProjectId)
  const teamAvailabilityArr = useAppSelector(selectTeamAvailabilityArr)
  const timeline = useAppSelector(selectProjectTimeline)
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const [weekNumber, setWeekNumber] = useState('')
  const [eventFetchingStatus, setEventFetchingStatus] = useState('loading')
  const [initialDate, setInitialDate] = useState(null)
  const [isTodayButtonEnabled, setIsTodayButtonEnabled] = useState(true)
  const [isProjectEnded, setIsProjectEnded] = useState(false)
  const firstDay = timeline.startDate
  const lastDay = generateDayJs(timeline.endDate)
    .weekday(7)
    .format('YYYY-MM-DD')
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
      const teamAvailabilities = []
      const updatedTeamCommonAvail = await updateWeekDayNumber(
        teamCommonAvailability
      )

      projectSundayDates.forEach(sundayDate => {
        Object.entries(updatedTeamCommonAvail).forEach(
          ([dayOfWeek, availability]: [string, string[]]) => {
            availability.forEach(([startTime, endTime]) => {
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

  const updateButtonAndInitialDateState = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    const today = dayjs()
    const projectStartDate = generateDayJs(firstDay)
    const projectEndDate = generateDayJs(lastDay)

    const { projectNotStarted, projectEnded, projectActive } =
      getProjectDateRanges(projectStartDate, projectEndDate, today)

    setIsTodayButtonEnabled(projectActive)
    setIsProjectEnded(projectEnded)

    if (projectNotStarted || projectEnded) {
      setInitialDate(projectStartDate.toDate())
    } else {
      setInitialDate(today.toDate())
    }
  }

  useEffect(() => {
    if (calendarId && userEmail) {
      fetchAllEvents()
      if (projectId) {
        fetchTeamCommonAvailability()
      }
    }
  }, [calendarId, userEmail, projectId])

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    updateButtonAndInitialDateState()
  }, [firstDay, lastDay, eventFetchingStatus])

  const disableButton = () => {
    setTimeout(() => {
      const calendarApi = calendarRef.current?.getApi()
      if (!calendarApi) return

      const button = calendarApi.el.querySelector(
        '.fc-createMeeting-button'
      ) as HTMLButtonElement

      if (button) {
        button.classList.add('disabled-button')
        button.disabled = true
      }
    })
  }

  const handleEventClick = e => {
    if (e.event.title !== 'Team Availability') {
      dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))
    }
  }

  const renderWeekNumber = () => {
    setTimeout(() => {
      const calendarApi = calendarRef.current?.getApi()
      if (!calendarApi) return

      const sundayDate = generateDayJs(calendarApi.getDate())
        .day(0)
        .format('YYYY-MM-DD')
      updateWeekNumber(sundayDate, firstDay, setWeekNumber)
    })
  }

  const handleTodayButtonClick = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    calendarApi.today()
  }

  const handleProjectStartButtonClick = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    calendarApi.gotoDate(firstDay)
  }

  const handleDynamicButtons = () => {
    renderWeekNumber()
    //hack: the calendar is fully initialized so that we can get the calendarRef
    if (projectCompleted) {
      disableButton()
    }
  }

  switch (eventFetchingStatus) {
    case 'success':
      return (
        <div className='calendar-container'>
          <FullCalendar
            key={initialDate ? initialDate.toISOString() : 'loading'}
            ref={calendarRef}
            datesSet={handleDynamicButtons}
            events={[...convertedEventsAsArr, ...teamAvailabilityArr]}
            eventClick={handleEventClick}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: true,
            }}
            headerToolbar={{
              start: `title ${
                isProjectEnded || !isTodayButtonEnabled
                  ? 'projectStart'
                  : 'today'
              } prev weekTitle next`,
              center: '',
              end: 'createMeeting',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            allDaySlot={false}
            initialView='timeGridWeek'
            nowIndicator={true}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialDate={initialDate}
            validRange={{ start: firstDay, end: lastDay }}
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
                click: () => handleProjectStartButtonClick(),
              },
              today: {
                text: 'Today',
                click: () => handleTodayButtonClick(),
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
