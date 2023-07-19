import { api } from './apiConfig'

export const createTicketApi = async ticketBody => {
  const ticketData = await api.post(`/createTicket`, ticketBody)
  return ticketData.data
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

export const updateTicketInformationAndStatus = async (ticketData: any) => {
  try {
    const updatedData = await api.put(`/updateTicketInformation`, ticketData)
    return updatedData.data
  } catch (error) {
    return { error: { status: 500, message: 'ticket status failed to change' } }
  }
}

export const deleteTicketApi = async ticketData => {
  await api.post(`/deleteTicket`, ticketData)
}
export const getOneTicketById = async () => {}

export const getTicketComments = async ticketId => {
  const response = await api.get(`/ticket/${ticketId}/comments`)

  return response.data
}

// Comments
export const createComment = async commentData => {
  const ticketData = await api.post('/createComment', commentData)
  return ticketData.data
}

export const deleteComment = async commentId => {
  const response = await api.delete(`/comments/${commentId}`)
  console.log(response)
}
