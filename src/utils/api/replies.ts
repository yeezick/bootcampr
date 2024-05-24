import { api } from './apiConfig'

export const createReply = async replyData => {
  try {
    const newReply = await api.post('/replies/create', replyData)
    return newReply.data
  } catch (error) {
    return { error }
  }
}
