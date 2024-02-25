import { Button, Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { useState } from 'react'
import { deleteComment } from 'utils/api/tickets'
import { fetchIcon } from 'utils/components/Icons'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const AuthorActions = ({
  authorId,
  commentId,
  toggleEditMode,
  toggleFetchComments,
}) => {
  const [deleteDialog, toggleDeleteDialog] = useState(false)
  const userId = useAppSelector(selectUserId)
  const allowEditComment = () => toggleEditMode(state => !state)
  const deleteThisComment = async () => toggleDeleteDialog(true)

  if (authorId === userId) {
    return (
      <div className='author-actions'>
        <Button onClick={allowEditComment} sx={{ minWidth: '0' }}>
          Edit
        </Button>
        {fetchIcon('circle')}
        <Button onClick={deleteThisComment}>Delete</Button>
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

const DeleteCommentDialog = ({
  commentId,
  open,
  toggleDeleteDialog,
  toggleFetchComments,
}) => {
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => toggleDeleteDialog(false)
  const handleDelete = async () => {
    const deleteResponse = await deleteComment(commentId)
    if (deleteResponse.status === 500) {
      dispatch(errorSnackbar(deleteResponse.message))
      return
    }
    toggleFetchComments(state => !state)
    toggleDeleteDialog(false)
  }
  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth='xs'>
      <DialogContent className='confirmation-dialog'>
        <h3>Delete comment?</h3>
        <p>Deleting this comment cannot be undone.</p>
        <div className='buttons'>
          <SecondaryButton
            handler={handleCloseDialog}
            text='Cancel'
            variant='text'
          />
          <PrimaryButton disableElevation handler={handleDelete} text='Close' />
        </div>
      </DialogContent>
    </Dialog>
  )
}
