import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { useState } from 'react'
import { deleteComment } from 'utils/api/comments'
import { deleteReply } from 'utils/api/replies'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { deleteCommentEvent } from 'utils/redux/actions/socketActions'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'

export const DeleteCommentDialog = ({ comment, open, toggleDeleteDialog }) => {
  const { _id: commentId } = comment
  const { _id: ticketId, status: ticketStatus } =
    useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => toggleDeleteDialog(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isReply = comment.parentId ? true : false

  const handleDelete = async () => {
    setIsLoading(true)

    let deleteResponse
    if (isReply) {
      deleteResponse = await deleteReply(commentId, comment.parentId)
    } else {
      deleteResponse = await deleteComment(commentId, ticketId)
    }

    if (deleteResponse.error) {
      dispatch(errorSnackbar(deleteResponse.message))
      return
    }
    dispatch(
      deleteCommentEvent({
        isReply,
        comment: { commentId, ticketId, ticketStatus },
      })
    )
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
