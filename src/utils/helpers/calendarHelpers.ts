import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
  ConvertedEvent,
  DateFieldsInterface,
  MeetingModalInfo,
} from 'interfaces/CalendarInterfaces'

dayjs.extend(utc)
dayjs.extend(timezone)

export const blankDayJs = () => dayjs()

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

export const convertDateFieldsForDisplay = gDateFields => {
  const { startTime, endTime } = gDateFields
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

/**
 * Translates raw google calendar events into objects that are consumable by FullCalendarJS
 * @param {ConvertedEvent[]} googleEvents
 * @returns Array of converted events
 */
export const convertGoogleEventsForCalendar = googleEvents => {
  if (!googleEvents) {
    return []
  }

  const convertedEvents = []
  for (const singleEvent of googleEvents) {
    const {
      attendees,
      creator,
      description,
      end,
      id,
      location,
      start,
      summary,
      ...metadata
    } = singleEvent

    const currentEvent: ConvertedEvent = {
      attendees: attendees || null,
      creator,
      // Todo: FullCalendar handles time conversions in an unusual way, saving them as UTC instead of as ISO acounting for TZ. This is a workaround.
      gDateFields: {
        endTime: end.dateTime,
        startTime: start.dateTime,
      },
      description: description || null,
      end: end.dateTime,
      eventId: id,
      location,
      metadata,
      start: start.dateTime,
      timeZone: start.timeZone,
      title: summary,
    }

    convertedEvents.push(currentEvent)
  }
  return convertedEvents
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
    timeZone: dayjs.tz.guess(),
    start: generateInitialTime('start'),
  }
}

export const generateDayJs = (date: string) => {
  return dayjs(date)
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
  const newDay = newDateAsDayjs.day()
  const finalDayjs = dayjs(timeIso)
    .set('year', newYear)
    .set('month', newMonth)
    .set('day', newDay)

  return finalDayjs.toISOString()
}
