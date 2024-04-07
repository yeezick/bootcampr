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
import { produce } from 'immer'
import { moveTicketColumn, reorderProjectColumn } from 'utils/api'
import { errorSnackbar } from './commentHelpers'
import {
  moveTicketBetweenColumns,
  reorderColumn,
} from 'utils/redux/slices/projectSlice'

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

export const handleColumnReordering = async (
  dispatch,
  projectId,
  projectTracker,
  movingTicket
) => {
  const {
    source: { droppableId: oldColumnId, index: oldColumnIdx },
    destination: { index: newColumnIdx },
  } = movingTicket
  const response =
    projectId === 'sandbox'
      ? reorderSandboxColumn(
          projectTracker[oldColumnId],
          oldColumnIdx,
          newColumnIdx
        )
      : await reorderProjectColumn(projectId, {
          columnId: projectTracker[oldColumnId],
          oldIdx: oldColumnIdx,
          newIdx: newColumnIdx,
        })

  if (response.status !== 200) {
    dispatch(errorSnackbar(response.message))
  } else {
    dispatch(
      reorderColumn({
        columnId: oldColumnId,
        reorderedColumn: response.reorderedColumn,
      })
    )
  }
}

export const handleTicketMovingBetweenColumns = async (
  dispatch,
  projectId,
  projectTracker,
  movingTicket
) => {
  const {
    source: { droppableId: oldColumnId, index: oldColumnIdx },
    destination: { droppableId: newColumnId, index: newColumnIdx },
  } = movingTicket
  const moveData = {
    oldColumnId,
    oldColumnIdx,
    newColumnId,
    newColumnIdx,
  }

  const response =
    projectId === 'sandbox'
      ? moveSandboxTicketBetweenColumns(projectTracker, moveData)
      : await moveTicketColumn(projectId, moveData)

  if (response.status !== 200) {
    dispatch(errorSnackbar(response.message))
  } else {
    dispatch(
      moveTicketBetweenColumns({
        newColumnId,
        newColumn: response.newColumn,
        oldColumnId,
        oldColumn: response.oldColumn,
      })
    )
  }
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

export const isSandboxId = id => {
  if (id.length === 6 || id === 'sandbox') {
    return true
  } else {
    return false
  }
}

export const moveSandboxTicketBetweenColumns = (projectTracker, moveData) => {
  const { newColumnId, newColumnIdx, oldColumnId, oldColumnIdx } = moveData
  const updatedProjectTracker = produce(projectTracker, draft => {
    const [movingTicket] = draft[oldColumnId].splice(oldColumnIdx, 1)
    draft[newColumnId].splice(newColumnIdx, 0, movingTicket)
  })

  const updatedColumns = {
    status: 200,
    newColumn: updatedProjectTracker[newColumnId],
    oldColumn: updatedProjectTracker[oldColumnId],
  }

  return updatedColumns
}

const reorderSandboxColumn = (column, oldIdx, newIdx) => {
  const updatedColumn = produce(column, draft => {
    const [movingTicket] = draft.splice(oldIdx, 1)
    draft.splice(newIdx, 0, movingTicket)
  })
  return { status: 200, reorderedColumn: updatedColumn }
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
