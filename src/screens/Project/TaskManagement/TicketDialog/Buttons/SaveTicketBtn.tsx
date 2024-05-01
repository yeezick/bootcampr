import { PrimaryButton } from 'components/Buttons'
import { saveUpdatedTicket } from 'utils/api/tickets'
import { successSnackbar } from 'utils/helpers/commentHelpers'
import {
  buildTicketPayload,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectId, updateTicket } from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const SaveTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()

  const handleSaveTicket = async e => {
    const ticketPayload = buildTicketPayload(projectId, userId, ticketFields)
    const ticketResponse = await saveUpdatedTicket(ticketPayload)

    if (ticketResponse.error) {
      // display error banner
    } else {
      dispatch(
        updateTicket({
          initialStatus: ticketFields.oldStatus,
          updatedTicket: ticketResponse,
        })
      )
      dispatch(resetTicketFields({}))
      dispatch(successSnackbar('Changes saved!'))
      closeVisibleTicketDialog(dispatch)
    }
  }

  return <PrimaryButton onClick={handleSaveTicket} label={'Save Changes'} />
}
