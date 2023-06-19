import { api } from './apiConfig'

export const fetchProjectCalendar = async calendarId => {
  try {
    const res = await api.get(`/calendar/${calendarId}/fetchCalendar`)
    return res.data.items
  } catch (error) {
    console.error(error)
    return false
  }
}
