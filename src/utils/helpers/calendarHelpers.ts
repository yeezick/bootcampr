import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { CalendarEvent } from 'interfaces/CalendarInterface'

dayjs.extend(utc)
dayjs.extend(timezone)

export const combineDateWithTime = (time, date) => {
  return dayjs(date).format('YYYY-MM-DD') + dayjs(time).format('THH:mm:ssZ')
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
