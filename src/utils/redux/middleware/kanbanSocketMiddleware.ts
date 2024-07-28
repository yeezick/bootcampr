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

      const kanbanEmitEvent = (event, data) => {
        return emitEvent('kanban', event, data, userId)
      }

      switch (action.type) {
        case 'CONNECT_KANBAN_SOCKET':
          socket = connectSocket('kanban', userId)
          //Receive information from backend
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
        case 'DISCONNECT_KANBAN_SOCKET':
          disconnectSocket('kanban')
          socket = null
          break
        //Send information to backend
        case 'CREATE_TICKET':
          kanbanEmitEvent('create-ticket', {
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'DELETE_TICKET':
          kanbanEmitEvent('delete-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'MOVE_TICKET':
          kanbanEmitEvent('move-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'REORDER_TICKET':
          kanbanEmitEvent('reorder-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
        case 'UPDATE_TICKET':
          kanbanEmitEvent('update-ticket', {
            authUserId: userId,
            receiversIds: receiversIds,
            ticketInfo: action.payload,
          })
          break
      }

      return next(action)
    }
}
