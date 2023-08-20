import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ConvertedEvent } from 'interfaces/CalendarInterface'
import { DateFieldsInterface } from 'interfaces'

dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Combines the user's date selection with their selected start/end times.
 * @param {Dayjs} date
 * @param {string} selectedTime (Ex: "1:30 PM")
 * @returns The updated DayJS object with user's selection
 */
export const combineDateWithTime = (date, selectedTime) => {
  const [time, period] = selectedTime.split(/\s/)
  const [hours, minutes] = time.split(':').map(Number)
  let newDate = date.set('hour', hours)

  if (period === 'PM' && hours !== 12) {
    newDate = newDate.add(12, 'hour')
  } else if (period === 'AM' && hours === 12) {
    newDate = newDate.set('hour', 0)
  }

  newDate = newDate.set('minute', minutes)
  return newDate
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
    console.log('single', singleEvent)
    let currentEvent: ConvertedEvent = {}
    const { attendees, creator, id, end, start, summary } = singleEvent
    currentEvent.attendees = attendees
    currentEvent.creator = creator.email
    currentEvent.id = id
    currentEvent.start = start.dateTime
    currentEvent.end = end.dateTime
    currentEvent.timeZone = start.timeZone
    currentEvent.title = summary
    convertedEvents.push(currentEvent)
  }
  console.log('conv', convertedEvents)
  return convertedEvents
}

/**
 * Generate a new set of DayJS objects for current times/timezone
 * @returns An empty & current object for DateField state.
 */
export const initialDateFields = (): DateFieldsInterface => {
  return {
    date: dayjs(),
    start: dayjs(),
    timeZone: dayjs.tz.guess(),
    end: dayjs(),
  }
}

/**
 * Takes the "00:00 PM" format from DayJS & converts it to the nearest half hour
 * Ex: "1:11 AM" => "1:30 AM"
 * @param {string} timeStr (Ex: "1:11 AM")
 * @returns
 */
export const roundToNearestHalfHour = timeStr => {
  const [time, period] = timeStr.split(/\s/)
  const [hourStr, minuteStr] = time.split(':')
  let hour = parseInt(hourStr)
  let minute = parseInt(minuteStr)

  if (period === 'PM' && hour !== 12) {
    hour += 12
  } else if (period === 'AM' && hour === 12) {
    hour = 0
  }

  if (minute < 15) {
    minute = 0
  } else if (minute >= 15 && minute < 45) {
    minute = 30
  } else {
    minute = 0
    hour += 1
  }

  if (hour >= 24) {
    hour = 0
  }

  let hourStrResult = hour.toString().padStart(2, '0')
  let minuteStrResult = minute.toString().padStart(2, '0')
  let periodResult = hour >= 12 ? 'PM' : 'AM'

  if (hour > 12) {
    hourStrResult = (hour - 12).toString().padStart(2, '0')
  } else if (hour === 0) {
    hourStrResult = '12'
  }
  if (hourStrResult[0] === '0') {
    hourStrResult = hourStrResult.slice(1)
  }

  const finalStr = `${hourStrResult}:${minuteStrResult} ${periodResult}`
  return finalStr
}
