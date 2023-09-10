import { api } from './apiConfig'

export const createEvent = async (calendarId: string, eventInfo) => {
  try {
    const res = await api.post(`/calendar/${calendarId}/createEvent`, eventInfo)
    return res.data
  } catch (error) {
    throw error
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
