import { CommentInterface } from 'interfaces'
import { api } from './apiConfig'
import { sampleComment, sampleReply } from 'utils/data/ticketConstants'
import { isSandboxId } from 'utils/helpers/taskHelpers'

export const getTicketComments = async (
  ticketId: string
): Promise<CommentInterface[]> => {
  try {
    if (isSandboxId(ticketId)) {
      return sampleComment
    }
    const response = await api.get(`/comments/${ticketId}`)
    return response.data.comments
  } catch (err) {
    console.error(err)
    return []
  }
}

export const createComment = async commentData => {
  try {
    const newComment = await api.post('/comments/create', commentData)
    return newComment.data
  } catch (error) {
    return { error }
  }
}

export const deleteComment = async (commentId, ticketId) => {
  try {
    const response = await api.delete(`/comments/${commentId}/${ticketId}`)
    return { status: response.status }
  } catch (error) {
    return { error: 'Failed to delete comment' }
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
    return { error: 'Failed to update comment' }
  }
}
