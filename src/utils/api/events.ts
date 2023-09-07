import { api } from './apiConfig'

export const createEvent = async (calendarId: any, eventInfo) => {
  try {
    const res = await api.post(`/calendar/${calendarId}/createEvent`, eventInfo)
    return res.data
  } catch (error) {
    throw error
  }
}
