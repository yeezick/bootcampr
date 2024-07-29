import {
  addCommentToTicket,
  deleteCommentFromTicket,
  selectMembersAsTeam,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { CommentSocketStateInterface } from 'interfaces/Comments'
import { toggleFetchComments } from 'utils/redux/slices/taskBoardSlice'

export const getCurrentState = (getState): CommentSocketStateInterface => {
  const state = getState()
  return {
    userId: selectUserId(state),
    members: selectMembersAsTeam(state),
    currentProjectId: selectProjectId(state),
  }
}

export const handleAddComment =
  ({ commentInfo, projectId }) =>
  (dispatch, getState) => {
    const { currentProjectId } = getCurrentState(getState)
    const { comment } = commentInfo

    if (currentProjectId !== projectId) return

    dispatch(addCommentToTicket(comment))
    dispatch(toggleFetchComments())
  }

export const handleDeleteComment =
  ({ commentInfo, projectId }) =>
  (dispatch, getState) => {
    const { isReply, comment } = commentInfo
    const { currentProjectId } = getCurrentState(getState)

    if (currentProjectId !== projectId) return
    if (!isReply) {
      dispatch(deleteCommentFromTicket(comment))
    }

    dispatch(toggleFetchComments())
  }

export const handleFetchComments = projectId => (dispatch, getState) => {
  const { currentProjectId } = getCurrentState(getState)

  if (currentProjectId !== projectId) return

  dispatch(toggleFetchComments())
}
