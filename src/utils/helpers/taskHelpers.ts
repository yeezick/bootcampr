import {
  emptyTicketFields,
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'

export const filterUserTickets = (allTickets, userId) => {
  const filteredTickets = {
    completed: [],
    inProgress: [],
    toDo: [],
    underReview: [],
  }

  for (const status in allTickets) {
    filteredTickets[status] = allTickets[status].filter(
      ticket => ticket.assignee === userId
    )
  }

  return filteredTickets
}

export const handleCloseVisibleTicketDialog = dispatch => {
  dispatch(setVisibleTicketDialog(''))
  dispatch(setTicketFields(emptyTicketFields))
}
