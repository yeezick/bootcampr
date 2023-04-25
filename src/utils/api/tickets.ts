import { api } from './apiConfig'

export const createTicketApi = async ticketBody => {
  const ticketData = await api.post(`/createTicket`, ticketBody)
  return ticketData.data
}
export const saveEditChange = async () => {}
export const deleteTicket = async (ticketId: string) => {
  // await api.delete(`/tickets/${ticketId}`)
}
export const getOneTicketById = async () => {}
