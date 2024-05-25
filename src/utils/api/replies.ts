import { api } from './apiConfig'

export const createReply = async replyData => {
  try {
    const newReply = await api.post('/replies/create', replyData)
    return newReply.data
  } catch (error) {
    return { error }
  }
}

export const updateReply = async (replyId, content) => {
  try {
    const response = await api.patch(`/replies/update/${replyId}`, content)
    return response.data
  } catch (error) {
    return { error }
  }
}
