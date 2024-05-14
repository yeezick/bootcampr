import { PrimaryButton } from 'components/Buttons'
import { useState } from 'react'
import { createTicket } from 'utils/api/tickets'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { isEmptyString } from 'utils/helpers/inputUtils'
import {
  buildTicketPayload,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  addTicketToStatus,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const CreateTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCreateTicket = async e => {
    setIsLoading(true)
    const ticketPayload = buildTicketPayload(projectId, userId, ticketFields)
    const ticketResponse = await createTicket(ticketPayload)

    if (ticketResponse.error) {
      dispatch(errorSnackbar('Something went wrong creating your story.'))
    } else {
      dispatch(addTicketToStatus(ticketResponse))
      dispatch(resetTicketFields({}))
      dispatch(successSnackbar('Story created!'))
      closeVisibleTicketDialog(dispatch)
    }
    setIsLoading(false)
  }

  return (
    <PrimaryButton
      disabled={isEmptyString(ticketFields.title)}
      loading={isLoading}
      label={'Create story'}
      onClick={handleCreateTicket}
    />
  )
}
