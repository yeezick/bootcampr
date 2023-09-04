import { api } from './apiConfig'
import {
  PasswordFormData,
  EmailFormData,
} from 'interfaces/AccountSettingsInterface'

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users')
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getOneUser = async (id: any) => {
  try {
    const res = await api.get(`/users/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (id: any, userProfile: any) => {
  try {
    const res = await api.post(`/onboarding/${id}`, userProfile)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (id: any, userUpdate: any) => {
  try {
    const res = await api.put(`/users/${id}`, userUpdate)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addPortfolioProject = async (id: any, newProject: any) => {
  try {
    const res = await api.patch(`/users/${id}`, newProject)
    return res.data
  } catch (error) {
    throw error
  }
}

export const signUp = async (credentials: any) => {
  try {
    const res = await api.post('/sign-up', credentials)
    const { message } = res.data
    if (message) return res.data
  } catch (error) {
    throw error
  }
}

export const signIn = async (credentials: any) => {
  try {
    const res = await api.post('/sign-in', credentials)
    if (res.data.invalidCredentials) {
      return { message: res.data.message }
    }
    const { token, user } = res.data
    localStorage.setItem('bootcamprAuthToken', token)
    return user
  } catch (error) {
    throw error
  }
}

export const logOut = async () => {
  try {
    localStorage.removeItem('bootcamprAuthToken')
  } catch (error) {
    throw error
  }
}

export const verify = async () => {
  const bootcamprAuthToken = localStorage.getItem('bootcamprAuthToken')
  if (bootcamprAuthToken) {
    const { data: payload } = await api.get('/verify')
    const { data: user } = await api.get(`/users/${payload.userID}`)
    return user
  }
  return false
}

export const verifyEmail = async email => {
  const { data, status } = await api.get(`/verify-email/${email}`)
  const msg = status >= 400 ? 'error' : 'message'

  return { status, message: data[msg] }
}

export const verifyTokenExpiration = async token => {
  try {
    const res = await api.get(`/verify-token-expiration/${token}`)
    return res.data.expired
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateUsersEmail = async (
  formData: PasswordFormData | EmailFormData,
  userId: string | undefined
) => {
  try {
    const data = await api.patch(`/update-email/${userId}`, formData)
    return data
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}
export const updateUsersPassword = async (
  formData: PasswordFormData | EmailFormData,
  userId: string | undefined
) => {
  try {
    const data = await api.patch(`/update-password/${userId}`, formData)
    return data
  } catch (error) {
    return { error: { status: 500, message: 'Something went wrong' } }
  }
}

export const setUnreadMessages = async (
  chatId: string,
  usersArray: string[]
) => {
  try {
    const res = await api.post(`/messages/setUnreadMessages`, {
      chatId: chatId,
      usersArray,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const markConversationAsRead = async (
  authUserId: string,
  chatId: string
) => {
  try {
    const res = await api.post(
      `/users/${authUserId}/messages/markConversationAsRead`,
      { chatId }
    )
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateAvailability = async (
  userId: string,
  newAvailability: any
) => {
  try {
    const res = await api.post(`/updateAvailability`, {
      newAvailability,
      userId,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
