import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    setIsLoading(true)
    const deleteResponse = await deleteComment(commentId, ticketId)
    if (deleteResponse.status === 500) {
      dispatch(errorSnackbar(deleteResponse.message))
      return
    }
    dispatch(deleteCommentFromTicket({ commentId, ticketId, ticketStatus }))
    toggleFetchComments(state => !state)
    toggleDeleteDialog(false)
    setIsLoading(false)
  }
  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth='xs'>
      <DialogContent className='confirmation-dialog'>
        <h3>Delete comment?</h3>
        <p>Deleting this comment cannot be undone.</p>
        <ButtonContainer>
          <TextButton onClick={handleCloseDialog} label='Cancel' />
          <PrimaryButton
            loading={isLoading}
            colorScheme='secondary'
            onClick={handleDelete}
            label='Delete'
          />
        </ButtonContainer>
      </DialogContent>
    </Dialog>
  )
}
