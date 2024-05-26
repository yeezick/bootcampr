import { Button } from '@mui/material'
import { useState } from 'react'
import { fetchIcon } from 'utils/components/Icons'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { DeleteCommentDialog } from './DeleteCommentDialog'

export const AuthorActions = ({
  authorId,
  commentId,
  toggleEditMode,
  toggleFetchComments,
  isDisabled,
}) => {
  const [deleteDialog, toggleDeleteDialog] = useState(false)
  const userId = useAppSelector(selectUserId)
  const allowEditComment = () => toggleEditMode(state => !state)
  const deleteThisComment = async () => toggleDeleteDialog(true)

  if (authorId === userId) {
    return (
      <div className='author-actions'>
        <Button
          onClick={allowEditComment}
          sx={{ minWidth: '0' }}
          disabled={isDisabled}
        >
          Edit
        </Button>
        {fetchIcon('circle')}
        <Button onClick={deleteThisComment} disabled={isDisabled}>
          Delete
        </Button>
        <DeleteCommentDialog
          commentId={commentId}
          open={deleteDialog}
          toggleDeleteDialog={toggleDeleteDialog}
          toggleFetchComments={toggleFetchComments}
        />
      </div>
    )
  }
}
