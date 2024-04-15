import { Payment } from 'interfaces'
import { api } from './apiConfig'

export const createCheckout = async () => {
  try {
    const res = await api.post('/payment/checkout')
    return res.data
  } catch (error) {
    throw error
  }
}

export const updatePaymentExperience = async (
  userId: string,
  payload: Payment
) => {
  try {
    const res = await api.post(`/users/experience/${userId}`, payload)
    return res.data
  } catch (error) {
    throw error
  }
}

export const verifyPayment = async sessionId => {
  try {
    const res = await api.post(`/payment/verify/${sessionId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
