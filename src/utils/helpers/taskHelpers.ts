import { Dayjs } from 'dayjs'
import { TicketInterface } from 'interfaces'
import { emptyTicketFields } from 'utils/data/taskBoardConstants'
import {
  resetTicketFields,
  setConfirmationDialogType,
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'

export const buildTicketPayload = (projectId, userId, ticketFields) => {
  let ticketPayload: TicketInterface = {
    projectId,
    createdBy: userId,
  }

  // Determine if there is a valid value for Assignee
  if (ticketFields.assignee === 'Unassigned') {
    const { assignee, ...remainingFields } = ticketFields
    ticketPayload = { ...remainingFields, ...ticketPayload }
  } else {
    ticketPayload = { ...ticketFields, ...ticketPayload }
  }
  return ticketPayload
}

export const doTicketsExist = projectTracker => {
  return Object.keys(projectTracker).some(
    status => projectTracker[status]?.length > 0
  )
}

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

export const formatTaskStatus = (status: string) => {
  switch (status) {
    case 'toDo':
      return 'To Do'
    case 'inProgress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    case 'underReview':
      return 'Under Review'
    default:
      return status
  }
}

export const closeVisibleTicketDialog = dispatch => {
  closeCancelDialog(dispatch)
  dispatch(setVisibleTicketDialog(''))
  dispatch(resetTicketFields({}))
}

export const closeCancelDialog = dispatch =>
  dispatch(setConfirmationDialogType(''))

export const handleCloseTicketDialog = dispatch => {
  closeCancelDialog(dispatch)
  closeVisibleTicketDialog(dispatch)
}

export const handleReduxDateChange = (dispatch, newDate: Dayjs) => {
  const formattedDate = newDate.format('YYYY-MM-DD')
  dispatch(setTicketFields({ dueDate: formattedDate }))
}
