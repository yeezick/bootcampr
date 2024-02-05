export const CommentContent = ({
  editMode,
  editedComment,
  setEditedComment,
  saveUpdatedComment,
  content,
}) => {
  return (
    <div className='comment-content'>
      {editMode ? (
        <input
          className='edit-comment'
          type='text'
          value={editedComment}
          onChange={e => setEditedComment(e.target.value)}
          onKeyUp={saveUpdatedComment}
        />
      ) : (
        <p>{content}</p>
      )}
    </div>
  )
}
