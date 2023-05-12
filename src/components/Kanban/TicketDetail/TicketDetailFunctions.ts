import { updateTicketInformationAndStatus } from 'utils/api/tickets'

import { TaskInterface, KeyOfTicketStatusType } from 'interfaces'

export const ticketStatusHasNotChange = async ({
  updateText,
  getAllTicket,
  ticketDetail,
  closeModal,
  setGetAllTicket,
  setIsBeingEdited,
}) => {
  setIsBeingEdited(true)
  const apiData = await updateTicketInformationAndStatus({
    ...updateText,
    ticketId: ticketDetail._id,
    projectId: ticketDetail.projectId,
  })

  setGetAllTicket({
    ...getAllTicket,
    [ticketDetail.status]: [{ ...apiData }],
  })
  setIsBeingEdited(false)

  closeModal()
}

export const ticketStatusChange = async ({
  updateText,
  getAllTicket,
  ticketDetail,
  closeModal,
  setGetAllTicket,
  concatenatedString,
  setIsBeingEdited,
}) => {
  setIsBeingEdited(true)

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

  await updateTicketInformationAndStatus({
    projectId: ticketDetail.projectId,
    newStatus: updatedStatus,
    ticketId: _id,
    oldStatus: ticketDetail.status,
    ...updateText,
  })
  setIsBeingEdited(false)

  closeModal()
}
