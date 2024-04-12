import { api } from './apiConfig'

export const getTicketComments = async (
  ticketId: number
): Promise<Comment[]> => {
  try {
    const response = await api.get(`/comments/${ticketId}`)
    return response.data.comments
  } catch (err) {
    console.error(err)
    return []
  }
}

export const createComment = async commentData => {
  try {
    const ticketData = await api.post('/comments/create', commentData)
    return ticketData.data
  } catch (error) {
    return { error: { status: 500, message: 'Failed to create comment' } }
  }
}

export const deleteComment = async commentId => {
  try {
    const response = await api.delete(`/comments/${commentId}`)
    return { status: response.status }
  } catch (error) {
    return { status: 500, message: 'Failed to delete comment' }
  }
}

export const updateComment = async (commentId, commentUpdates) => {
  try {
    const response = await api.patch(
      `/comments/update/${commentId}`,
      commentUpdates
    )
    return { status: 200, ...response.data }
  } catch (error) {
    return { error: { status: 500, message: 'Failed to update comment' } }
  }
}

export const getReplies = async (commentId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/comments/${commentId}/replies`)
    return response.data
  } catch (error) {
    return []
  }
}
