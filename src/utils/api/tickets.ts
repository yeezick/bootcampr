import { api } from './apiConfig'

export const createTicket = async ticketBody => {
  try {
    const ticketData = await api.post(`/tickets/create`, ticketBody)
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
    const updatedData = await api.put(`/tickets/${ticketData._id}`, ticketData)
    return updatedData.data
  } catch (error) {
    return { error: { status: 500, message: 'Ticket failed to update' } }
  }
}

export const deleteTicketApi = async ticketData => {
  try {
    await api.put(`/tickets/delete/${ticketData.ticketId}`, ticketData)
  } catch (error) {
    return { error: { status: 500, message: 'Ticket failed to delete' } }
  }
}
