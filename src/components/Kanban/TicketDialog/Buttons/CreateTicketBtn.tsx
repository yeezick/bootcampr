import { PrimaryButton } from 'components/Buttons'
import { createTicket } from 'utils/api/tickets'
import { emptyTicketFields } from 'utils/data/taskBoardConstants'
import {
  buildTicketPayload,
  handleCloseVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  addTicketToStatus,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const CreateTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => handleCloseVisibleTicketDialog(dispatch)

  const handleCreateTicket = async e => {
    const ticketPayload = buildTicketPayload(projectId, userId, ticketFields)
    const ticketResponse = await createTicket(ticketPayload)

    if (ticketResponse.error) {
      // display error banner
    } else {
      dispatch(addTicketToStatus(ticketResponse))
      dispatch(setTicketFields(emptyTicketFields))
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Ticket created successfully',
          duration: 3000,
          severity: 'success',
        })
      )
      handleCloseDialog()
    }
  }

  return <PrimaryButton handler={handleCreateTicket} text={'Create Ticket'} />
}
