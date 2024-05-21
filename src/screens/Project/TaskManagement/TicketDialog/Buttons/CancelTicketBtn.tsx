import { SecondaryButton } from 'components/Buttons'
import { toggleCancelDialog } from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const CancelTicketBtn = () => {
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleCancel = () =>
    toggleCancelDialog(dispatch, userId, projectId, ticketFields)

  return <SecondaryButton onClick={handleCancel} label={'Cancel'} />
}
