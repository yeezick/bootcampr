import { api } from './apiConfig'

export const createCheckout = async () => {
  try {
    const res = await api.post('/payment/checkout')
    return res.data
  } catch (error) {
    throw error
  }
}
