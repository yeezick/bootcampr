import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { CalendarEvent } from 'interfaces/CalendarInterface'

dayjs.extend(utc)
dayjs.extend(timezone)

export const combineDateWithTime = (date, selectedTime) => {
  const [time, period] = selectedTime.split(/\s/)
  const [hours, minutes] = time.split(':').map(Number)
  let newDate = date.set('hour', hours)
  // Adjust for AM/PM period
  if (period === 'PM' && hours !== 12) {
    newDate = newDate.add(12, 'hour')
  } else if (period === 'AM' && hours === 12) {
    newDate = newDate.set('hour', 0)
  }
  newDate = newDate.set('minute', minutes)

  return newDate
}

export const convertGoogleEventsForCalendar = googleEvents => {
  if (!googleEvents) {
    return []
  }

  const convertedEvents = []
  for (const singleEvent of googleEvents) {
    let currentEvent: CalendarEvent = {}
    const { start, end, summary } = singleEvent
    currentEvent.start = start.dateTime
    currentEvent.end = end.dateTime
    currentEvent.title = summary
    convertedEvents.push(currentEvent)
  }
  return convertedEvents
}

export const initialDateFields = () => {
  return {
    date: dayjs(),
    start: dayjs(),
    timeZone: dayjs.tz.guess(),
    end: dayjs(),
  }
}

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
