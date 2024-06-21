import { PrimaryButton } from 'components/Buttons'
import { useState } from 'react'
import { useKanbanSocketEvents } from 'components/Socket/kanbanSocket'
import { saveUpdatedTicket } from 'utils/api/tickets'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { isEmptyString } from 'utils/helpers/inputUtils'
import {
  buildTicketPayload,
  closeVisibleTicketDialog,
  isSandboxId,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectProjectId,
  updateTicket,
  selectProjectCompleted,
} from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  selectHasConflictedTicket,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const SaveTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const hasConflictedTicket = useAppSelector(selectHasConflictedTicket)
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { updateTicketEvent } = useKanbanSocketEvents()

  const handleSaveTicket = async e => {
    setIsLoading(true)
    const ticketPayload = buildTicketPayload(projectId, userId, ticketFields)
    const ticketResponse = await saveUpdatedTicket(ticketPayload)

    if (ticketResponse.error) {
      dispatch(errorSnackbar('Something went wrong saving your story.'))
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

      if (!isSandboxId(projectId)) {
        updateTicketEvent({
          initialStatus: ticketFields.oldStatus,
          updatedTicket: ticketResponse,
          projectId,
        })
      }
    }
    setIsLoading(false)
  }

  return (
    <PrimaryButton
      disabled={
        isEmptyString(ticketFields.title) ||
        hasConflictedTicket ||
        projectCompleted
      }
      loading={isLoading}
      onClick={handleSaveTicket}
      label={'Save changes'}
    />
  )
}
