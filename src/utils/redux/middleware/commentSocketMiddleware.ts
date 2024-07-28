import {
  handleAddComment,
  handleDeleteComment,
  handleFetchComments,
} from 'utils/helpers/commentSocketHelpers'
import { selectMembersAsTeam, selectProjectId } from '../slices/projectSlice'
import { selectUserId } from '../slices/userSlice'
import {
  connectSocket,
  disconnectSocket,
  emitEvent,
} from 'utils/socket/socketManager'

export const createCommentSocketMiddleware = () => {
  let socket

  return ({ dispatch, getState }) =>
    next =>
    action => {
      const state = getState()
      const userId = selectUserId(state)
      const members = selectMembersAsTeam(state)
      const receiversIds = members.map(member => member._id)
      const currentProjectId = selectProjectId(state)

      const commentEmitEvent = (event, data) => {
        return emitEvent('comment', event, data, userId)
      }

      switch (action.type) {
        case 'CONNECT_COMMENT_SOCKET':
          console.log('Connecting and setting event listeners')
          socket = connectSocket('comment', userId)

          socket.on('comment-added', ({ commentInfo, projectId }) => {
            dispatch(handleAddComment({ commentInfo, projectId }))
          })
          socket.on('comment-deleted', ({ commentInfo, projectId }) => {
            dispatch(handleDeleteComment({ commentInfo, projectId }))
          })
          socket.on('comment-edited', ({ projectId }) => {
            dispatch(handleFetchComments(projectId))
          })
          socket.on('comment-liked', ({ projectId }) => {
            dispatch(handleFetchComments(projectId))
          })
          socket.on('comment-replied', ({ projectId }) => {
            dispatch(handleFetchComments(projectId))
          })
          break
        case 'DISCONNECT_COMMENT_SOCKET':
          disconnectSocket('comment')
          socket = null
          break
        case 'ADD_COMMENT':
          commentEmitEvent('add-comment', {
            receiversIds: receiversIds,
            commentInfo: action.payload,
            projectId: currentProjectId,
          })
          break
        case 'DELETE_COMMENT':
          commentEmitEvent('delete-comment', {
            receiversIds: receiversIds,
            commentInfo: action.payload,
            projectId: currentProjectId,
          })
          break
        case 'EDIT_COMMENT':
          commentEmitEvent('edit-comment', {
            receiversIds: receiversIds,
            projectId: currentProjectId,
          })
          break
        case 'LIKE_COMMENT':
          commentEmitEvent('like-comment', {
            receiversIds: receiversIds,
            projectId: currentProjectId,
          })
          break
        case 'REPLY_COMMENT':
          commentEmitEvent('reply-comment', {
            receiversIds: receiversIds,
            projectId: currentProjectId,
          })
          break
      }

      return next(action)
    }
}
