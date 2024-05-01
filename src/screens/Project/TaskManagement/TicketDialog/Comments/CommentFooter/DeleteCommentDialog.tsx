import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { deleteComment } from 'utils/api/comments'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch } from 'utils/redux/hooks'

export const DeleteCommentDialog = ({
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
        <ButtonContainer>
          <TextButton
            colorScheme='create-task'
            onClick={handleCloseDialog}
            label='Cancel'
          />
          <PrimaryButton
            colorScheme='secondary'
            onClick={handleDelete}
            label='Delete'
          />
        </ButtonContainer>
      </DialogContent>
    </Dialog>
  )
}
