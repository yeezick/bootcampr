import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { createTicket } from 'utils/api/tickets'
import {
  buildTicketPayload,
  closeCancelDialog,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  addTicketToStatus,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import {
  resetTicketFields,
  selectTicketFields,
  setConfirmationDialogType,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const CreateTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()

  const handleCreateTicket = async e => {
    const ticketPayload = buildTicketPayload(projectId, userId, ticketFields)
    const ticketResponse = await createTicket(ticketPayload)

    if (ticketResponse.error) {
      // display error banner
    } else {
      dispatch(addTicketToStatus(ticketResponse))
      dispatch(resetTicketFields({}))
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Ticket created successfully',
          duration: 3000,
          severity: 'success',
        })
      )
      closeVisibleTicketDialog(dispatch)
    }
  }

  return (
    <PrimaryButton
      handler={handleCreateTicket}
      text={'Create Ticket'}
      disableElevation
    />
  )
}

export const CancelTicketBtn = () => {
  const dispatch = useAppDispatch()
  const handleCancel = () => dispatch(setConfirmationDialogType('cancel'))

  return (
    <SecondaryButton
      handler={handleCancel}
      text={'Cancel'}
      sx={{ backgroundColor: '#fff' }}
    />
  )
}
