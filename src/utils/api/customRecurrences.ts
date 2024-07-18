import { api } from './apiConfig'

export const fetchCustomRecurrences = async userId => {
  try {
    const response = await api.get(`/customRecurrences/${userId}`)
    return response
  } catch (error) {
    console.error('Failed to fetch custom recurrences', error)
  }
}

export const createCustomRecurrence = async customRecurrence => {
  try {
    const response = api.post('/customRecurrence', customRecurrence)
    return response
  } catch (error) {
    console.error('Failed to create custom recurrence', error)
  }
}
