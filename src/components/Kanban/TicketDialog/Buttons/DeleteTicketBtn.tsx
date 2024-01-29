import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { useState } from 'react'
import { deleteTicketApi } from 'utils/api/tickets'
import { closeVisibleTicketDialog } from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { deleteTicket, selectProjectId } from 'utils/redux/slices/projectSlice'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import '../../styles/ConfirmationDialogs.scss'

export const DeleteTicketBtn = () => {
  const [deleteDialog, toggleDeleteDialog] = useState(false)
  const handleOpenDeleteDialog = () => toggleDeleteDialog(true)

  return (
    <>
      <SecondaryButton
        handler={handleOpenDeleteDialog}
        text={'Delete task'}
        sx={{ background: '#fff', borderColor: '#d32f2f', color: '#d32f2f' }}
      />
      <DeleteTicketDialog
        deleteDialog={deleteDialog}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </>
  )
}

const DeleteTicketDialog = ({ deleteDialog, toggleDeleteDialog }) => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const dispatch = useAppDispatch()
  const handleCloseDeleteDialog = () => toggleDeleteDialog(false)

  const handleDeleteTicket = async () => {
    const { status, _id: ticketId } = ticketFields
    //BC-412: add guard clause for tickets that failed to delete & display error toast
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
    <Dialog open={deleteDialog} onClose={handleCloseDeleteDialog} maxWidth='xs'>
      <DialogContent className='confirmation-dialog'>
        <h3>Delete task?</h3>
        <p>
          All the information, including comments, will be lost and gone
          forever.
        </p>
        <div className='buttons'>
          <SecondaryButton
            handler={handleCloseDeleteDialog}
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
