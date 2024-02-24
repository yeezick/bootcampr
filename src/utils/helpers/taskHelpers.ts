import { Dayjs } from 'dayjs'
import { TicketInterface } from 'interfaces'
import { emptyTicketFields } from 'utils/data/taskBoardConstants'
import {
  resetTicketFields,
  setConfirmationDialogType,
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { blankDayJs } from './calendarHelpers'
import { deepEqual } from 'utils/functions/utilityFunctions'

export const buildTicketPayload = (
  projectId,
  userId,
  ticketFields
): TicketInterface => {
  return {
    projectId,
    createdBy: userId,
    ...ticketFields,
  }
}

export const closeVisibleTicketDialog = dispatch => {
  closeConfirmationDialog(dispatch)
  dispatch(setVisibleTicketDialog(''))
  dispatch(resetTicketFields({}))
}

export const closeConfirmationDialog = dispatch =>
  dispatch(setConfirmationDialogType(''))

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

export const handleReduxDateChange = (dispatch, newDate: Dayjs) => {
  const formattedDate = newDate.format('YYYY-MM-DD')
  dispatch(setTicketFields({ dueDate: formattedDate }))
}

export const hasUserEditedFields = (userId, projectId, ticketFields) => {
  // Skipping status
  const initialTicketFields = {
    ...emptyTicketFields,
    createdBy: userId,
    dueDate: blankDayJs().format('YYYY-MM-DD'),
    projectId,
  }
  const currentFields = { ...ticketFields, status: '' }
  return deepEqual(initialTicketFields, currentFields) ? false : true
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

export const toggleCancelDialog = (
  dispatch,
  userId,
  projectId,
  ticketFields
) => {
  if (hasUserEditedFields(userId, projectId, ticketFields)) {
    dispatch(setConfirmationDialogType('cancel'))
  } else {
    closeVisibleTicketDialog(dispatch)
  }
}
