import { LikeButton } from './LikeButton'
import { AuthorActions } from './AuthorActions'

export const CommentFooter = ({
  comment,
  toggleFetchComments,
  fetchComments,
  toggleEditMode,
}) => {
  const { author, likes, _id: commentId } = comment

  return (
    <div className='comment-actions'>
      <LikeButton
        commentId={commentId}
        fetchComments={fetchComments}
        likes={likes}
        toggleFetchComments={toggleFetchComments}
      />
      <AuthorActions
        authorId={author.userId}
        commentId={commentId}
        toggleEditMode={toggleEditMode}
        toggleFetchComments={toggleFetchComments}
      />
    </div>
  )
}
