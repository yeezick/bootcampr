import { api } from './apiConfig'

export const fetchProjectCalendar = async projectId => {
  try {
    const res = await api.get(`/calendar/${calendarId}/fetchCalendar`)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
