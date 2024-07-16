import { setCustomRecurrences } from 'utils/redux/slices/recurrenceSlice'
import { api } from './apiConfig'
import { useAppDispatch } from 'utils/redux/hooks'

export const fetchCustomRecurrences = async userId => {
  try {
    const response = await api.get(`/customRecurrences/${userId}`)
    return response
  } catch (error) {
    console.error('Failed to fetch custom recurrences', error)
  }
}
