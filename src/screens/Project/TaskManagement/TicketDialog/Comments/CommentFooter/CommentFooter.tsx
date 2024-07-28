import { LikeButton } from './LikeButton'
import { AuthorActions } from './AuthorActions'
import { useAppSelector } from 'utils/redux/hooks'
import { selectHasConflictedTicket } from 'utils/redux/slices/taskBoardSlice'
import { selectProjectCompleted } from 'utils/redux/slices/projectSlice'

export const CommentFooter = ({ comment, toggleEditMode }) => {
  const hasConflictedTicket = useAppSelector(selectHasConflictedTicket)
  const projectCompleted = useAppSelector(selectProjectCompleted)

  return (
    <div className='comment-actions'>
      <LikeButton
        comment={comment}
        isDisabled={hasConflictedTicket || projectCompleted}
      />
      <AuthorActions
        comment={comment}
        toggleEditMode={toggleEditMode}
        isDisabled={hasConflictedTicket || projectCompleted}
      />
    </div>
  )
}
