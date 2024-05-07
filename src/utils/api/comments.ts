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
    const ticketData = await api.post('/comments/create', commentData)
    return ticketData.data
  } catch (error) {
    return { error: { status: 500, message: 'Failed to create comment' } }
  }
}

export const deleteComment = async (commentId, ticketId) => {
  try {
    const response = await api.delete(`/comments/${ticketId}/${commentId}`)
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

export const getReplies = async (
  commentId: string
): Promise<CommentInterface[]> => {
  try {
    if (isSandboxId(commentId)) {
      return sampleReply
    }
    const response = await api.get(`/comments/${commentId}/replies`)
    return response.data
  } catch (error) {
    return []
  }
}
