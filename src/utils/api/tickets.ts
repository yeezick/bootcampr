import { api } from './apiConfig'

export const createTicketApi = async ticketBody => {
  const ticketData = await api.post(`/createTicket`, ticketBody)
  return ticketData.data
}

export const ticketStatusChangedApi = async (ticketData: any) => {
  try {
    const data = await api.put(`/ticketStatusChanged`, ticketData)
    return data
  } catch (error) {
    return { error: { status: 500, message: 'Something went wrong' } }
  }
}

export const ticketStatusHasNotChangedApi = async (ticketData: any) => {
  try {
    const data = await api.put(`/ticketStatusHasNotChanged`, ticketData)
    return data
  } catch (error) {
    return { error: { status: 500, message: 'Something went wrong' } }
  }
}

export const deleteTicket = async (ticketId: string) => {
  // await api.delete(`/tickets/${ticketId}`)
}
export const getOneTicketById = async () => {}
