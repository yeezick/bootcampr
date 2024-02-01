import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { deleteTicketApi } from 'utils/api/tickets'
import {
  closeConfirmationDialog,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { deleteTicket, selectProjectId } from 'utils/redux/slices/projectSlice'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import {
  selectConfirmationDialogType,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import '../../styles/ConfirmationDialogs.scss'

export const DeleteTicketDialog = () => {
  const confirmationDialogType = useAppSelector(selectConfirmationDialogType)
  const projectId = useAppSelector(selectProjectId)
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => closeConfirmationDialog(dispatch)

  const handleDeleteTicket = async () => {
    const { status, _id: ticketId } = ticketFields
    // BC-412: add guard clause for tickets that failed to delete & display error toast
    await deleteTicketApi({
      ticketId,
      ticketStatus: status,
      projectId,
    })

    dispatch(deleteTicket({ status, ticketId }))
    dispatch(
      createSnackBar({
        isOpen: true,
        message: 'Ticket deleted successfully',
        duration: 3000,
        vertical: 'bottom',
        horizontal: 'right',
        snackbarStyle: { background: 'green', color: 'white' },
        severity: 'success',
      })
    )
    closeVisibleTicketDialog(dispatch)
  }

  return (
    <Dialog
      open={confirmationDialogType === 'delete'}
      onClose={handleCloseDialog}
      maxWidth='xs'
    >
      <DialogContent className='confirmation-dialog'>
        <h3>Delete task?</h3>
        <p>
          All the information, including comments, will be lost and gone
          forever.
        </p>
        <div className='buttons'>
          <SecondaryButton
            handler={handleCloseDialog}
            text='Cancel'
            variant='text'
          />
          <PrimaryButton
            disableElevation
            handler={handleDeleteTicket}
            text='Delete'
            sx={{ backgroundColor: '#d32f2f', color: '#fff' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
