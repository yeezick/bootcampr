export const createTicketEvent = ({ createdTicketInfo, projectId }) => ({
  type: 'CREATE_TICKET',
  payload: { createdTicketInfo, projectId },
})

export const deleteTicketEvent = ({ deletedTicketInfo, projectId }) => {
  return {
    type: 'DELETE_TICKET',
    payload: {
      deletedTicketInfo,
      projectId,
    },
  }
}

export const moveTicketEvent = ({ ticketColumnInfo, ticketId, projectId }) => ({
  type: 'MOVE_TICKET',
  payload: {
    ticketColumnInfo,
    ticketId,
    projectId,
  },
})

export const reorderTicketEvent = ({ ticketColumnInfo, projectId }) => ({
  type: 'REORDER_TICKET',
  payload: {
    ticketColumnInfo,
    projectId,
  },
})

export const updateTicketEvent = ({ updatedTicketInfo, projectId }) => ({
  type: 'UPDATE_TICKET',
  payload: {
    updatedTicketInfo,
    projectId,
  },
})
