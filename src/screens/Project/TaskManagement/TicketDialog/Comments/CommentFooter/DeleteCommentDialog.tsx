import { Dialog, DialogContent } from '@mui/material'
import { SecondaryButton } from 'components/Buttons'
import { RedPrimaryButton } from 'components/Buttons/ButtonVariants'
import { deleteComment } from 'utils/api/comments'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { deleteCommentFromTicket } from 'utils/redux/slices/projectSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'

export const DeleteCommentDialog = ({
  commentId,
  open,
  toggleDeleteDialog,
  toggleFetchComments,
}) => {
  const { _id: ticketId, status: ticketStatus } =
    useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => toggleDeleteDialog(false)
  const handleDelete = async () => {
    const deleteResponse = await deleteComment(commentId, ticketId)
    if (deleteResponse.status === 500) {
      dispatch(errorSnackbar(deleteResponse.message))
      return
    }
    dispatch(deleteCommentFromTicket({ commentId, ticketId, ticketStatus }))
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
            colorScheme='create-task'
            handler={handleCloseDialog}
            text='Cancel'
            variant='text'
          />
          <RedPrimaryButton
            handler={handleDelete}
            text='Delete'
            variant='contained'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
