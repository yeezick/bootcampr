import { api } from './apiConfig'

export const fetchCustomRecurrences = async userId => {
  try {
    const res = await api.get(`/customRecurrences/${userId}`)

    return res.data
    //dispatch(setCustomRecurrences(response.data.map((recurrence: any) => recurrence.recurrenceLabel)));
  } catch (error) {
    console.error('Failed to fetch custom recurrences', error)
  }
}
