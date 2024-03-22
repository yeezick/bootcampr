import { getRandomInt } from 'screens/AccountSettings/helper/data'
import { api } from './apiConfig'
import { changeDateTimeZone, generateDayJs } from 'utils/helpers'
import { EventInfo } from 'interfaces'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const createEvent = async (calendarId: string, eventInfo: EventInfo) => {
  try {
    if (calendarId === 'sandbox') {
      return buildSandboxEvent(eventInfo)
    } else {
      const res = await api.post(
        `/calendar/${calendarId}/createEvent`,
        eventInfo
      )
      return res.data
    }
  } catch (error) {
    throw error
  }
}

const buildSandboxEvent = eventInfo => {
  const { description, end, start, summary } = eventInfo
  const updatedAttendees = eventInfo.attendees.map(member => {
    return { ...member, responseStatus: 'needsAction' }
  })

  const startTime = changeDateTimeZone(start.dateTime, start.timezone)
  const endTime = changeDateTimeZone(end.dateTime, end.timezone)

  return {
    attendees: updatedAttendees,
    description,
    creator: {
      email: 'erick.manrique@bootcampr.io',
    },
    end: endTime,
    eventId: getRandomInt(10).toString(),
    googleDateFields: {
      endTime: end.dateTime,
      startTime: start.dateTime,
    },
    hangoutLink: 'https://meet.google.com',
    start: startTime,
    timeZone: start.timeZone,
    title: summary,
  }
}

export const updateEvent = async (calendarId: string, eventId, eventInfo) => {
  try {
    const res = await api.put(
      `/calendar/${calendarId}/updateEvent/${eventId}`,
      eventInfo
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteEvent = async (calendarId: string, eventId) => {
  try {
    const res = await api.delete(
      `/calendar/${calendarId}/fetchEvent/${eventId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
