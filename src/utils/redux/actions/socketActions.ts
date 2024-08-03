const createAction =
  type =>
  (payload = {}) => ({
    type,
    payload,
  })

//Comment Actions
export const addCommentEvent = createAction('ADD_COMMENT')
export const deleteCommentEvent = createAction('DELETE_COMMENT')
export const editCommentEvent = createAction('EDIT_COMMENT')
export const likeCommentEvent = createAction('LIKE_COMMENT')
export const replyCommentEvent = createAction('REPLY_COMMENT')

//Kanban Actions
export const createTicketEvent = createAction('CREATE_TICKET')
export const deleteTicketEvent = createAction('DELETE_TICKET')
export const moveTicketEvent = createAction('MOVE_TICKET')
export const reorderTicketEvent = createAction('REORDER_TICKET')
export const updateTicketEvent = createAction('UPDATE_TICKET')
