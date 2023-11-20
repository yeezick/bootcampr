import { SecondaryButton } from 'components/Buttons'
import { deleteTicketApi } from 'utils/api/tickets'
import { handleCloseVisibleTicketDialog } from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { deleteTicket, selectProjectId } from 'utils/redux/slices/projectSlice'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'

export const DeleteTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => handleCloseVisibleTicketDialog(dispatch)

  const handleDeleteTicket = async () => {
    const { status, _id: ticketId } = ticketFields
    //BC-412: add guard clause for tickets that failed to delete & display error toast
    await deleteTicketApi({
      ticketId,
      status,
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
    handleCloseDialog()
  }

  return <SecondaryButton handler={handleDeleteTicket} text={'Delete ticket'} />
}
