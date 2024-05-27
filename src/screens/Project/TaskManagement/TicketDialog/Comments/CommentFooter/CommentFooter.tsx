import { LikeButton } from './LikeButton'
import { AuthorActions } from './AuthorActions'
import { useAppSelector } from 'utils/redux/hooks'
import { selectHasConflictedTicket } from 'utils/redux/slices/taskBoardSlice'

export const CommentFooter = ({
  comment,
  toggleFetchComments,
  fetchComments,
  toggleEditMode,
}) => {
  const { authorId, likes, _id: commentId } = comment
  const hasConflictedTicket = useAppSelector(selectHasConflictedTicket)

  return (
    <div className='comment-actions'>
      <LikeButton
        commentId={commentId}
        fetchComments={fetchComments}
        likes={likes}
        toggleFetchComments={toggleFetchComments}
        isDisabled={hasConflictedTicket}
      />
      <AuthorActions
        authorId={authorId}
        commentId={commentId}
        toggleEditMode={toggleEditMode}
        toggleFetchComments={toggleFetchComments}
        isDisabled={hasConflictedTicket}
      />
    </div>
  )
}
