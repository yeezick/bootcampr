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
    return { error: { status: 500, message: 'ticket status failed to change' } }
  }
}

export const ticketStatusHasNotChangedApi = async (ticketData: any) => {
  try {
    const updatedData = await api.put(`/ticketStatusHasNotChanged`, ticketData)
    return updatedData.data
  } catch (error) {
    return { error: { status: 500, message: 'ticket status failed to change' } }
  }
}

export const deleteTicketApi = async ticketData => {
  await api.post(`/deleteTicket`, ticketData)
}
export const getOneTicketById = async () => {}
