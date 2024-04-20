import { blankDayJs, generateHexadecimal } from 'utils/helpers'
import { api } from './apiConfig'
import { isSandboxId } from 'utils/helpers/taskHelpers'

export const createTicket = async ticketBody => {
  try {
    if (isSandboxId(ticketBody.projectId)) {
      return buildDummyTicket(ticketBody)
    }

    const ticketData = await api.post(`/tickets/create`, ticketBody)
    return ticketData.data
  } catch (error) {
    return { error: { status: 500, message: 'Failed to create ticket', error } }
  }
}

const buildDummyTicket = ticketBody => {
  return {
    ...ticketBody,
    _id: ticketBody._id || generateHexadecimal(),
    createdAt: ticketBody.createdAt || blankDayJs().format(),
    updatedAt: blankDayJs().format(),
    __v: 0,
  }
}

export const saveUpdatedTicket = async ticketData => {
  try {
    if (isSandboxId(ticketData.projectId)) {
      return buildDummyTicket(ticketData)
    }

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
