import { api } from './apiConfig'

export const getEmailPreferenceOptions = async () => {
  try {
    const res = await api.get('/bootcampr/emailPreferenceOptions')
    return res.data
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const getUserEmailPreferences = async userId => {
  try {
    const res = await api.get(`/users/${userId}/emailPreferences`)
    return res.data
  } catch (error) {
    console.error(error)
    return {}
  }
}
