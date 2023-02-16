import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setAuthUser, selectAuthUser } from '../redux/slices/users/userSlice'
import { api } from './apiConfig'
import {
  PasswordFormData,
  EmailFormData,
} from '../types/AccountSettingsInterface'

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

export const checkEmailAuth = async (email: any) => {
  try {
    const res = await api.post('/email', email)
    return res.data.message
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
    const { bootcamprAuthToken, user } = res.data
    localStorage.setItem('bootcamprAuthToken', bootcamprAuthToken)
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
