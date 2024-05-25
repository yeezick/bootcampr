import { LikeButton } from './LikeButton'
import { AuthorActions } from './AuthorActions'

export const CommentFooter = ({
  comment,
  toggleFetchComments,
  fetchComments,
  toggleEditMode,
}) => {
  const { authorId, likes, _id: commentId } = comment

  return (
    <div className='comment-actions'>
      <LikeButton
        comment={comment}
        fetchComments={fetchComments}
        toggleFetchComments={toggleFetchComments}
      />
      <AuthorActions
        comment={comment}
        toggleEditMode={toggleEditMode}
        toggleFetchComments={toggleFetchComments}
      />
    </div>
  )
}
