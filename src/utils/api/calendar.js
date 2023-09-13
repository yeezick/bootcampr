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

export const fetchUserCalendar = async (calendarId, userEmail) => {
  try {
    const res = await api.get(
      `/calendar/${calendarId}/fetchCalendar/${userEmail}`
    )
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
