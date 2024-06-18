import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { api } from 'utils/api'
import { errorSnackbar, infoSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
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

const ENDPOINT = api.getUri()

export const useKanbanSocket = userId => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`${ENDPOINT}kanban`, {
      query: { userId },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    })

    const handleConnect = () => {
      newSocket.emit('setUserId', userId)
    }

    newSocket.on('connect', handleConnect)

    setSocket(newSocket)
    return () => {
      newSocket.off('connect', handleConnect)
      newSocket.disconnect()
    }
  }, [userId])

  return socket
}

export const useKanbanSocketEvents = () => {
  const dispatch = useAppDispatch()
  const authUserId = useAppSelector(selectUserId)
  const socket = useKanbanSocket(authUserId)
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const projectTracker = useAppSelector(selectProjectTracker)
  const members = useAppSelector(selectMembersAsTeam)
  const currentTicketFields = useAppSelector(selectTicketFields)
  const currentProjectId = useAppSelector(selectProjectId)
  const membersWithoutAuthIds = members
    .map(member => member._id)
    .filter(id => id !== authUserId)

  const deleteTicketEvent = ticketInfo => {
    socket.emit('delete-ticket', {
      authUserId: authUserId,
      receiversIds: membersWithoutAuthIds,
      ticketInfo,
    })
  }

  const updateTicketEvent = ticketInfo => {
    socket.emit('update-ticket', {
      authUserId: authUserId,
      receiversIds: membersWithoutAuthIds,
      updatedTicketInfo: ticketInfo,
    })
  }

  const moveTicketEvent = ({ ticketInfo, ticketId, projectId }) => {
    socket.emit('move-ticket', {
      ticketInfo,
      receiversIds: membersWithoutAuthIds,
      authUserId: authUserId,
      ticketId: ticketId,
      projectId,
    })
  }

  const reorderTicketEvent = ticketInfo => {
    socket.emit('reorder-ticket', {
      ticketInfo,
      receiversIds: membersWithoutAuthIds,
    })
  }

  useEffect(() => {
    if (!socket) return

    const handleDeleteTicket = ({ updaterId, ticketInfo }) => {
      const { ticketStatus, ticketId, projectId } = ticketInfo
      if (currentProjectId !== projectId) return
      const deletedTicket = projectTracker[ticketStatus].find(
        ticket => ticket._id === ticketId
      )
      if (!deletedTicket) return

      const isCurrentTicket = deletedTicket._id === currentTicketFields._id

      dispatch(deleteTicket({ status: ticketStatus, ticketId }))

      if (authUserId !== updaterId && visibleTicketDialog && isCurrentTicket) {
        dispatch(errorSnackbar('This ticket is no longer available.'))
        dispatch(
          setConflictTicket({ ticket: deletedTicket, dialogState: 'delete' })
        )
      }
    }

    const handleMoveTicket = ({
      ticketInfo,
      updaterId,
      ticketId,
      projectId,
    }) => {
      if (currentProjectId !== projectId) return

      const newStatus = ticketInfo.newColumnId
      const isCurrentTicketMoved =
        ticketId === currentTicketFields._id &&
        currentTicketFields.status !== newStatus

      dispatch(moveTicketBetweenColumns(ticketInfo))

      if (
        authUserId !== updaterId &&
        visibleTicketDialog &&
        isCurrentTicketMoved
      ) {
        const updatedTicket = projectTracker[newStatus].find(
          ticket => ticket._id === ticketId
        )

        if (!updateTicket) return

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

    const handleReoerderTicket = ticketInfo => {
      const { columnId, reorderedColumn, projectId } = ticketInfo
      if (currentProjectId !== projectId) return
      dispatch(
        reorderColumn({
          columnId,
          reorderedColumn,
        })
      )
    }

    const handleUpdateTicket = ({ updaterId, ticketInfo }) => {
      const { initialStatus, updatedTicket, projectId } = ticketInfo
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

      if (authUserId !== updaterId && visibleTicketDialog && isCurrentTicket) {
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

    socket.on('ticket-deleted', handleDeleteTicket)
    socket.on('ticket-moved', handleMoveTicket)
    socket.on('ticket-reordered', handleReoerderTicket)
    socket.on('ticket-updated', handleUpdateTicket)

    return () => {
      socket.off('ticket-deleted', handleDeleteTicket)
      socket.off('ticket-moved', handleMoveTicket)
      socket.off('ticket-reordered', handleReoerderTicket)
      socket.off('ticket-updated', handleUpdateTicket)
    }
  }, [socket, projectTracker, authUserId, visibleTicketDialog, dispatch])

  return {
    deleteTicketEvent,
    moveTicketEvent,
    reorderTicketEvent,
    updateTicketEvent,
  }
}
