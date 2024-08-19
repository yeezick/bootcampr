import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import {
  ConvertedEvent,
  DateFieldsInterface,
  MeetingModalInfo,
} from 'interfaces'
import { staticEmails } from 'utils/data/calendarConstants'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)

export const blankDayJs = () => dayjs()

export const buildSandboxEvent = (eventInfo, eventId?): ConvertedEvent => {
  const { description, end, googleMeetingInfo, start, summary } = eventInfo
  const updatedAttendees = eventInfo.attendees.map(member => {
    return { ...member, responseStatus: 'needsAction' }
  })

  if (!staticEmails.includes(updatedAttendees[0].email)) {
    updatedAttendees.shift()
  }

  const startTime = changeDateTimeZone(start.dateTime, start.timezone)
  const endTime = changeDateTimeZone(end.dateTime, end.timezone)

  return {
    attendees: updatedAttendees,
    description,
    creator: 'dana@designer.com',
    end: endTime,
    eventId: eventId || generateHexadecimal(),
    googleDateFields: {
      endTime: end.dateTime,
      startTime: start.dateTime,
    },
    hangoutLink: googleMeetingInfo.enabled ? 'https://meet.google.com' : '',
    organizer: 'dana@designer.com',
    start: startTime,
    timeZone: start.timeZone,
    title: summary,
  }
}

export const changeDateTimeZone = (time, timeZone) => {
  const formattedTime = dayjs(time).format('YYYY-MM-DDTHH:mm')
  const timeZonedTime = dayjs.tz(formattedTime, timeZone).format()
  return timeZonedTime
}

export const checkIfAllMembersInvited = (
  attendees,
  projectMembers,
  inviteAll,
  toggleInviteAll
) => {
  const invitedMembers = []
  for (const member in attendees) {
    if (attendees[member] === true) {
      invitedMembers.push(true)
    }
  }
  const allMembersInvited = invitedMembers.length === projectMembers.length
  if (inviteAll && !allMembersInvited) {
    toggleInviteAll(false)
  } else if (!inviteAll && allMembersInvited) {
    toggleInviteAll(true)
  }
}

export const convertDateFieldsForDisplay = googleDateFields => {
  const { startTime, endTime } = googleDateFields
  return {
    date: dayjs(startTime).format('dddd, MMMM D'),
    end: dayjs(endTime).format('h:mm A'),
    start: dayjs(startTime).format('h:mm A'),
  }
}

/**
 * Combines the user's date selection with their selected start/end times.
 * @param {Dayjs} date
 * @param {string} selectedTime (Ex: "01:30 PM" or "")
 * @returns The updated DayJS object with user's selection
 */
export const combineDateWithTime = (newDate, selectedTime) => {
  if (selectedTime.length > 8) {
    selectedTime = dayjs(selectedTime).format('h:mm A')
  }
  const [time, period] = selectedTime.split(/\s/)
  const [hours, minutes] = time.split(':').map(Number)
  let updatedDate = dayjs(newDate)
  updatedDate = updatedDate.set('hour', hours)

  if (period === 'PM' && hours !== 12) {
    updatedDate = updatedDate.add(12, 'hour')
  } else if (period === 'AM' && hours === 12) {
    updatedDate = updatedDate.set('hour', 0)
  }

  updatedDate = updatedDate.set('minute', minutes)
  return updatedDate.toISOString()
}

export const formatIsoToHalfHour = isoStr => dayjs(isoStr).format('h:mm A')

/**
 * Generate a new set of DayJS objects for current times/timezone
 * @returns An empty & current object for DateField state.
 */
export const initialDateFields = (): DateFieldsInterface => {
  return {
    date: dayjs().toISOString(),
    end: generateInitialTime('end'),
    eventTimezone: dayjs.tz.guess(),
    start: generateInitialTime('start'),
  }
}

export const generateDayJs = (date: string) => {
  return dayjs(date)
}

export const convertToUTC = (time, timezoneOffset) => {
  const formatedTime = dayjs(time).format('YYYY-MM-DDTHH:mm:ss')
  return dayjs.tz(formatedTime, timezoneOffset).utc().format()
}

const generateInitialTime = type => {
  const timeStr = dayjs().format('hh:mm A')
  const [time, period] = timeStr.split(/\s/)
  const [hourStr, minuteStr] = time.split(':')
  let minuteNum = parseInt(minuteStr)
  let hourNum = parseInt(hourStr)
  let finalStr = dayjs()

  if (period === 'PM' && hourNum !== 12) {
    hourNum += 12
  } else if (period === 'AM' && hourNum === 12) {
    hourNum = 0
  }

  if (type === 'start') {
    if (minuteNum > 30) {
      finalStr = finalStr.minute(60)
    } else if (minuteNum > 5) {
      finalStr = finalStr.minute(30)
    } else {
      finalStr = finalStr.minute(0)
    }
  } else {
    /* End time is set to the option after the start time */
    if (minuteNum > 30) {
      finalStr = finalStr.minute(30)
      finalStr = finalStr.hour(hourNum + 1)
    } else if (minuteNum > 5) {
      finalStr = finalStr.minute(60)
    } else {
      finalStr = finalStr.minute(30)
    }
  }

  return dayjs(finalStr).toISOString()
}

export const generateHexadecimal = () => {
  const hex = '0123456789ABCDEF'
  let output = ''
  for (let i = 0; i < 6; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length))
  }
  return output
}

/**
 * Converts the event object from FullCalendar into meetingModal fields
 * @param e The event passed into the handler when a user clicks on an event in the calendar
 * @returns The event info required fto display a meeting modal
 */
export const parseCalendarEventForMeetingInfo = (e): MeetingModalInfo => {
  const { end, start } = e.event._instance.range
  const { extendedProps, title: summary } = e.event._def

  return {
    ...extendedProps,
    dateFields: {
      date: start.toISOString(),
      end: end.toISOString(),
      start: start.toISOString(),
      timeZone: extendedProps.timeZone,
    },
    summary,
    visibility: 'display',
  }
}

export const updateDateInTimeSelections = (newDate, timeIso) => {
  const newDateAsDayjs = dayjs(newDate)
  const newYear = newDateAsDayjs.year()
  const newMonth = newDateAsDayjs.month()
  const newDay = newDateAsDayjs.date()
  const finalDayjs = dayjs(timeIso)
    .set('year', newYear)
    .set('month', newMonth)
    .set('date', newDay)

  return finalDayjs.toISOString()
}

export const getProjectDateRanges = (
  projectStartDate,
  projectEndDate,
  today
) => {
  const projectNotStarted = today.isBefore(projectStartDate)
  const projectEnded = today.isAfter(projectEndDate)
  const projectActive =
    today.isSameOrAfter(projectStartDate) &&
    today.isSameOrBefore(projectEndDate)

  return { projectNotStarted, projectEnded, projectActive }
}

export const updateWeekNumber = (sundayDate, firstDay, setWeekNumber) => {
  const secondWeekSunday = dayjs(firstDay).add(7, 'day').format('YYYY-MM-DD')
  const thirdWeekSunday = dayjs(secondWeekSunday)
    .add(7, 'day')
    .format('YYYY-MM-DD')
  if (sundayDate === firstDay) {
    setWeekNumber('1')
  } else if (sundayDate === secondWeekSunday) {
    setWeekNumber('2')
  } else if (sundayDate === thirdWeekSunday) {
    setWeekNumber('3')
  } else {
    setWeekNumber('4')
  }
}

export const updateWeekDayNumber = teamCommonAvailability => {
  Object.keys(teamCommonAvailability).forEach(key => {
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

  return teamCommonAvailability
}

export const formatAvailabilityDate = (
  sundayDate,
  dayOfWeek,
  startTime,
  endTime
) => {
  //To support both Safari and Chrome we need to pass the date in the format 'YYYY-MM-DD HH:mm A'
  const dateFormat = 'YYYY-MM-DD HH:mm A'
  const start = dayjs(`${sundayDate} ${startTime}`, dateFormat)
    .day(Number(dayOfWeek))
    .format('YYYY-MM-DDTHH:mm:ss')
  const end = dayjs(`${sundayDate} ${endTime}`, dateFormat)
    .day(Number(dayOfWeek))
    .format('YYYY-MM-DDTHH:mm:ss')
  return {
    start: dayjs.tz(start, 'America/New_York').format('YYYY-MM-DDTHH:mm:ssZ'),
    end: dayjs.tz(end, 'America/New_York').format('YYYY-MM-DDTHH:mm:ssZ'),
  }
}

export const generateTeamAvailabilityEvent = (start, end) => ({
  title: 'Team Availability',
  start: start,
  end: end,
  backgroundColor: '#E8F5E9',
  borderColor: '#388E3C',
  timeZone: 'America/New_York',
})
