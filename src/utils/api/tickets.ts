import { TicketInterface } from 'interfaces'
import { api } from './apiConfig'

export const createTicket = async ticketBody => {
  try {
    const ticketData = await api.post(`/createTicket`, ticketBody)
    return ticketData.data
  } catch (error) {
    return { error: { status: 500, message: 'Failed to create ticket', error } }
  }
}

export const ticketStatusChangedApi = async ticketData => {
  try {
    const data = await api.put(`/ticketStatusChanged`, ticketData)
    return data
  } catch (error) {
    return { error: { status: 500, message: 'ticket status failed to change' } }
  }
}
export const ticketDraggedToNewSectionApi = async ticketData => {
  try {
    const data = await api.put(`/ticketDraggedToNewSection`, ticketData)
    return data
  } catch (error) {
    return {
      error: {
        status: 500,
        message: 'ticket status failed to change to new section',
      },
    }
  }
}

export const saveTicketStatusChange = async ticketData => {
  try {
    const updatedData = await api.put(`/updateTicket/status`, ticketData)
    if (updatedData.status !== 200) {
      return false
    } else return updatedData.data
  } catch (error) {
    return { error: { status: 500, message: 'ticket status failed to change' } }
  }
}

export const saveUpdatedTicket = async ticketData => {
  try {
    const updatedData = await api.put(`/updateTicket`, ticketData)
    return updatedData.data
  } catch (error) {
    return { error: { status: 500, message: 'ticket status failed to change' } }
  }
}

export const deleteTicketApi = async ticketData => {
  await api.post(`/deleteTicket`, ticketData)
}
export const getOneTicketById = async () => {}

export const getTicketComments = async (
  ticketId: number
): Promise<Comment[]> => {
  try {
    const response = await api.get(`/ticket/${ticketId}/comments`)
    return response.data.comments
  } catch (err) {
    console.error(err)
    return []
  }
}

// Comments
export const createComment = async commentData => {
  const ticketData = await api.post('/createComment', commentData)
  return ticketData.data
}

export const deleteComment = async commentId => {
  const response = await api.delete(`/comments/${commentId}`)
  return response.status
}

export const updateComment = async (commentId, commentUpdates) => {
  const response = await api.patch(
    `/updateComment/${commentId}`,
    commentUpdates
  )
  return response.data
}

export const getReplies = async (commentId: number): Promise<Comment[]> => {
  const response = await api.get(`/comment/${commentId}/replies`)
  return response.data
}
