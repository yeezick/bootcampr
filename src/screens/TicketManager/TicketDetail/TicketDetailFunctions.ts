import { ticketStatusChangedApi } from 'utils/api'

import {
  TaskInterface,
  KeyOfTicketStatusType,
} from '../../../interfaces/TicketInterFace'

export const ticketStatusHasNotChange = ({
  updateText,
  getAllTicket,
  ticketDetail,
  closeModal,
  setGetAllTicket,
}) => {
  const editData = getAllTicket[
    ticketDetail.status as KeyOfTicketStatusType
  ]?.map((data: TaskInterface) => {
    if (data._id === ticketDetail._id) {
      data = {
        ...updateText,
      }
    }
    return data
  })

  setGetAllTicket({
    ...getAllTicket,
    [ticketDetail.status]: [...editData],
  })
  closeModal()
}

export const ticketStatusChange = ({
  updateText,
  getAllTicket,
  ticketDetail,
  closeModal,
  setGetAllTicket,
  concatenatedString,
}) => {
  const { status, _id } = updateText
  const updatedStatus = concatenatedString(status)

  const removeFromSection = getAllTicket[
    ticketDetail.status as KeyOfTicketStatusType
  ]?.filter((newStatus: TaskInterface) => newStatus._id !== _id)

  const addToNewSection = [
    ...getAllTicket[updatedStatus as KeyOfTicketStatusType],
    {
      ...updateText,
      status: updatedStatus,
    },
  ]

  setGetAllTicket({
    ...getAllTicket,
    [ticketDetail.status]: [...removeFromSection],
    [updatedStatus]: [...addToNewSection],
  })

  ticketStatusChangedApi({
    projectId: ticketDetail.projectId,
    newStatus: updatedStatus,
    ticketID: _id,
    oldStatus: ticketDetail.status,
  })
  closeModal()
}
