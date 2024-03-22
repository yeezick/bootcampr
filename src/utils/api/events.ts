import { api } from './apiConfig'
import { buildSandboxEvent } from 'utils/helpers'
import { EventInfo } from 'interfaces'

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

export const updateEvent = async (calendarId: string, eventId, eventInfo) => {
  try {
    if (calendarId === 'sandbox') {
      return buildSandboxEvent(eventInfo, eventId)
    } else {
      const res = await api.put(
        `/calendar/${calendarId}/updateEvent/${eventId}`,
        eventInfo
      )
      return res.data
    }
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
