import { LikeButton } from './LikeButton'
import { AuthorActions } from './AuthorActions'
import { useAppSelector } from 'utils/redux/hooks'
import { selectHasConflictedTicket } from 'utils/redux/slices/taskBoardSlice'
import { selectProjectPresented } from 'utils/redux/slices/projectSlice'

export const CommentFooter = ({
  comment,
  toggleFetchComments,
  fetchComments,
  toggleEditMode,
}) => {
  const { authorId, likes, _id: commentId } = comment
  const hasConflictedTicket = useAppSelector(selectHasConflictedTicket)
  const projectPresented = useAppSelector(selectProjectPresented)

  return (
    <div className='comment-actions'>
      <LikeButton
        comment={comment}
        fetchComments={fetchComments}
        toggleFetchComments={toggleFetchComments}
        isDisabled={hasConflictedTicket || projectPresented}
      />
      <AuthorActions
        comment={comment}
        toggleEditMode={toggleEditMode}
        toggleFetchComments={toggleFetchComments}
        isDisabled={hasConflictedTicket || projectPresented}
      />
    </div>
  )
}
