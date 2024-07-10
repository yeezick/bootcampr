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

export const getColumnState = (tracker, columnId) => {
  return [...tracker[columnId]]
}

export const handleColumnReordering = async (
  dispatch,
  projectId,
  projectTracker,
  movingTicket,
  reorderTicketEvent
) => {
  const {
    source: { droppableId: oldColumnId, index: oldColumnIdx },
    destination: { index: newColumnIdx },
  } = movingTicket
  const initialColumnState = getColumnState(projectTracker, oldColumnId)

  try {
    const response = reorderColumnHandler(
      projectTracker[oldColumnId],
      oldColumnIdx,
      newColumnIdx
    )
    const reorderColumnAction = isSandboxId(projectId)
      ? reorderColumn({
          columnId: oldColumnId,
          reorderedColumn: response.reorderedColumn,
        })
      : reorderTicketEvent({
          ticketColumnInfo: {
            columnId: oldColumnId,
            reorderedColumn: response.reorderedColumn,
          },
          projectId,
        })
    dispatch(reorderColumnAction)

    if (!isSandboxId(projectId)) {
      await reorderProjectColumn(projectId, {
        columnId: oldColumnId,
        oldIdx: oldColumnIdx,
        newIdx: newColumnIdx,
      })
    }
  } catch (error) {
    dispatch(
      reorderColumn({
        columnId: oldColumnId,
        reorderedColumn: initialColumnState,
      })
    )
    dispatch(errorSnackbar('Error reordering ticket within column.'))
  }
}

export const handleTicketMovingBetweenColumns = async (
  dispatch,
  projectId,
  projectTracker,
  movingTicket,
  moveTicketEvent
) => {
  const {
    source: { droppableId: oldColumnId, index: oldColumnIdx },
    destination: { droppableId: newColumnId, index: newColumnIdx },
    draggableId: ticketId,
  } = movingTicket
  const moveData = {
    oldColumnId,
    oldColumnIdx,
    newColumnId,
    newColumnIdx,
    ticketId,
  }
  const initialColumnsStates = {
    oldColumn: getColumnState(projectTracker, oldColumnId),
    newColumn: getColumnState(projectTracker, newColumnId),
  }

  try {
    const response = moveTicketBetweenColumnsHandler(projectTracker, moveData)
    const movingTicketColumns = {
      newColumnId,
      newColumn: response.newColumn,
      oldColumnId,
      oldColumn: response.oldColumn,
    }
    const moveColumnAction = isSandboxId(projectId)
      ? moveTicketBetweenColumns(movingTicketColumns)
      : moveTicketEvent({
          ticketColumnInfo: movingTicketColumns,
          ticketId,
          projectId,
        })

    dispatch(moveColumnAction)

    if (!isSandboxId(projectId)) {
      await moveTicketColumn(projectId, moveData)
    }
  } catch (error) {
    console.error(error)
    dispatch(
      moveTicketBetweenColumns({
        newColumnId: oldColumnId,
        newColumn: initialColumnsStates.oldColumn,
        oldColumnId: newColumnId,
        oldColumn: initialColumnsStates.newColumn,
      })
    )
    dispatch(errorSnackbar('Error moving tickets between columns'))
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
  if (id && id !== 'active' && (id.length === 6 || id === 'sandbox')) {
    return true
  } else {
    return false
  }
}

export const isWaitlistExperience = experience => {
  if (experience === 'waitlist') {
    return true
  } else {
    return false
  }
}

export const isPaidWaitlistExperience = payment => {
  const { paid, experience } = payment
  return paid === true && experience === 'waitlist'
}

export const isPaidActiveExperience = payment => {
  const { paid, experience } = payment
  return paid === true && experience === 'active'
}

export const moveTicketBetweenColumnsHandler = (projectTracker, moveData) => {
  const { newColumnId, newColumnIdx, oldColumnId, oldColumnIdx } = moveData
  const updatedProjectTracker = produce(projectTracker, draft => {
    const [movingTicket] = draft[oldColumnId].splice(oldColumnIdx, 1)
    draft[newColumnId].splice(newColumnIdx, 0, movingTicket)
    movingTicket.status = newColumnId
  })

  const updatedColumns = {
    newColumn: updatedProjectTracker[newColumnId],
    oldColumn: updatedProjectTracker[oldColumnId],
  }

  return updatedColumns
}

const reorderColumnHandler = (column, oldIdx, newIdx) => {
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
