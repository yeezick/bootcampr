import { selectMembersAsTeam } from '../slices/projectSlice'
import { selectUserId } from '../slices/userSlice'
import {
  handleCreateTicket,
  handleDeleteTicket,
  handleMoveTicket,
  handleReorderTicket,
  handleUpdateTicket,
} from 'utils/helpers/taskBoardSocketHelpers'
import {
  connectSocket,
  disconnectSocket,
  emitEvent,
} from 'utils/socket/socketManager'

export const createKanbanSocketMiddleware = () => {
  let socket

  return ({ dispatch, getState }) =>
    next =>
    action => {
      const state = getState()
      const userId = selectUserId(state)
      const members = selectMembersAsTeam(state)
      const receiversIds = members.map(member => member._id)

      switch (action.type) {
        case 'CONNECT_SOCKET':
          socket = connectSocket('kanban', userId)
          socket.on('ticket-created', createdTicketInfo => {
            dispatch(handleCreateTicket(createdTicketInfo))
          })
          socket.on('ticket-deleted', ({ updaterId, ticketInfo }) => {
            dispatch(handleDeleteTicket({ updaterId, ticketInfo }))
          })
          socket.on('ticket-moved', ({ ticketInfo, updaterId }) => {
            dispatch(
              handleMoveTicket({
                ticketInfo,
                updaterId,
              })
            )
          })
          socket.on('ticket-reordered', ticketInfo => {
            dispatch(handleReorderTicket(ticketInfo))
          })
          socket.on('ticket-updated', ({ updaterId, ticketInfo }) => {
            dispatch(handleUpdateTicket({ updaterId, ticketInfo }))
          })
          break
        case 'DISCONNECT_SOCKET':
          disconnectSocket('kanban')
          socket = null
          break
        case 'CREATE_TICKET':
          emitEvent('kanban', 'create-ticket', {
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'DELETE_TICKET':
          emitEvent('kanban', 'delete-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'MOVE_TICKET':
          emitEvent('kanban', 'move-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'REORDER_TICKET':
          emitEvent('kanban', 'reorder-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'UPDATE_TICKET':
          emitEvent('kanban', 'update-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
      }

      return next(action)
    }
}
