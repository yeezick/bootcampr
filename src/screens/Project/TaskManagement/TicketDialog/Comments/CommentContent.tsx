import { updateComment } from 'utils/api/tickets'

export const CommentContent = ({
  comment,
  editMode,
  editedComment,
  setEditedComment,
  toggleFetchComments,
  toggleEditMode,
}) => {
  const { content, _id: commentId } = comment
  const saveUpdatedComment = async e => {
    if (e.key === 'Enter') {
      const commentUpdates = {
        content: editedComment,
      }
      await updateComment(commentId, commentUpdates)
      toggleFetchComments(state => !state)
      toggleEditMode(false)
    }
  }

  const handleEditCommentChange = e => setEditedComment(e.target.value)

  return (
    <div className='comment-content'>
      {editMode ? (
        <input
          className='edit-comment'
          type='text'
          value={editedComment}
          onChange={handleEditCommentChange}
          onKeyUp={saveUpdatedComment}
        />
      ) : (
        <p>{content}</p>
      )}
    </div>
  )
}
