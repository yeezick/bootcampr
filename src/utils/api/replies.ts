import { api } from './apiConfig'

export const createReply = async replyData => {
  try {
    const newReply = await api.post('/replies/create', replyData)
    return newReply.data
  } catch (error) {
    return { error: 'Failed to create reply' }
  }
}

export const updateReply = async (replyId, content) => {
  try {
    const response = await api.patch(`/replies/update/${replyId}`, content)
    return response.data
  } catch (error) {
    return { error: 'Failed to update reply' }
  }
}

export const deleteReply = async (replyId, parentId) => {
  try {
    const response = await api.delete(`/replies/${replyId}/${parentId}`)
    return { status: response.status }
  } catch (error) {
    return { error: 'Failed to delete reply' }
  }
}
