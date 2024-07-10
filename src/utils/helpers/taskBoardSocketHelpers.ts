import {
  addTicketToStatus,
  deleteTicket,
  moveTicketBetweenColumns,
  reorderColumn,
  selectMembersAsTeam,
  selectProjectId,
  selectProjectTracker,
  updateTicket,
} from 'utils/redux/slices/projectSlice'
import {
  selectTicketFields,
  selectVisibleTicketDialog,
  setConflictTicket,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { errorSnackbar, infoSnackbar } from './commentHelpers'
import { TaskBoardSocketStateInterface } from 'interfaces/TaskBoardInterface'

export const getCurrentState = (getState): TaskBoardSocketStateInterface => {
  const state = getState()
  return {
    userId: selectUserId(state),
    visibleTicketDialog: selectVisibleTicketDialog(state),
    projectTracker: selectProjectTracker(state),
    members: selectMembersAsTeam(state),
    currentTicketFields: selectTicketFields(state),
    currentProjectId: selectProjectId(state),
  }
}

export const handleCreateTicket =
  ({ createdTicketInfo, projectId }) =>
  (dispatch, getState) => {
    console.log(createdTicketInfo, projectId)
    const { currentProjectId } = getCurrentState(getState)

    if (currentProjectId !== projectId) return

    dispatch(addTicketToStatus(createdTicketInfo))
  }

export const handleDeleteTicket =
  ({ updaterId, ticketInfo }) =>
  (dispatch, getState) => {
    const {
      userId,
      currentProjectId,
      projectTracker,
      currentTicketFields,
      visibleTicketDialog,
    } = getCurrentState(getState)
    const { deletedTicketInfo, projectId } = ticketInfo
    const { ticketStatus, ticketId } = deletedTicketInfo

    if (currentProjectId !== projectId) return

    const deletedTicket = projectTracker[ticketStatus].find(
      ticket => ticket._id === ticketId
    )

    if (!deletedTicket) return

    const isCurrentTicket = deletedTicket._id === currentTicketFields._id

    dispatch(deleteTicket({ status: ticketStatus, ticketId }))

    if (userId !== updaterId && visibleTicketDialog && isCurrentTicket) {
      dispatch(errorSnackbar('This ticket is no longer available.'))
      dispatch(
        setConflictTicket({
          ticket: deletedTicket,
          dialogState: 'delete',
        })
      )
    }
  }

export const handleMoveTicket =
  ({ ticketInfo, updaterId }) =>
  (dispatch, getState) => {
    const {
      userId,
      currentProjectId,
      projectTracker,
      currentTicketFields,
      visibleTicketDialog,
    } = getCurrentState(getState)
    const { ticketColumnInfo, ticketId, projectId } = ticketInfo

    if (currentProjectId !== projectId) return

    const newStatus = ticketColumnInfo.newColumnId
    const isCurrentTicketMoved =
      ticketId === currentTicketFields._id &&
      currentTicketFields.status !== newStatus

    dispatch(moveTicketBetweenColumns(ticketColumnInfo))

    if (userId !== updaterId && visibleTicketDialog && isCurrentTicketMoved) {
      const updatedTicket = projectTracker[newStatus].find(
        ticket => ticket._id === ticketId
      )

      if (!updatedTicket) return

      dispatch(
        infoSnackbar(
          'This ticket has been updated. Please click the refresh icon on the ticket to see the changes.'
        )
      )
      dispatch(
        setConflictTicket({ ticket: updatedTicket, dialogState: 'edit' })
      )
    }
  }

export const handleReorderTicket =
  ({ ticketColumnInfo, projectId }) =>
  (dispatch, getState) => {
    const { currentProjectId } = getCurrentState(getState)

    if (currentProjectId !== projectId) return

    dispatch(reorderColumn(ticketColumnInfo))
  }

export const handleUpdateTicket =
  ({ updaterId, ticketInfo }) =>
  (dispatch, getState) => {
    const {
      userId,
      currentProjectId,
      projectTracker,
      currentTicketFields,
      visibleTicketDialog,
    } = getCurrentState(getState)

    const { updatedTicketInfo, projectId } = ticketInfo
    const { updatedTicket, initialStatus } = updatedTicketInfo

    if (currentProjectId !== projectId) return

    const isCurrentTicket = updatedTicket._id === currentTicketFields._id
    const ticket = projectTracker[initialStatus].find(
      ticket => ticket._id === updatedTicket._id
    )

    if (!ticket) return

    dispatch(
      updateTicket({
        initialStatus,
        updatedTicket,
      })
    )

    if (userId !== updaterId && visibleTicketDialog && isCurrentTicket) {
      dispatch(
        infoSnackbar(
          'This ticket has been updated. Please click the refresh icon on the ticket to see the changes.'
        )
      )
      dispatch(
        setConflictTicket({ ticket: updatedTicket, dialogState: 'edit' })
      )
    }
  }
