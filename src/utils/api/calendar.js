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

    if (res.status === 400) {
      throw Error(
        `No calendar events for calendarId (${calendarId}) belonging to user (${userEmail}).`,
        res.data
      )
    }

    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
