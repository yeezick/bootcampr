import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectProjectId,
  selectProjectCompleted,
} from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { CreateTaskButton } from 'components/Buttons'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'

export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const { _id: userId, payment } = useAppSelector(selectAuthUser)
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const dispatch = useAppDispatch()
  const isSandboxOrWaitlist =
    isSandboxId(payment.experience) || isWaitlistExperience(payment.experience)

  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      resetTicketFields({
        createdBy: isSandboxOrWaitlist ? 'edwardEngineer' : userId,
        status: columnStatus,
        projectId,
      })
    )
  }

  return (
    <CreateTaskButton
      onClick={openCreateTicketDialog}
      label='Create story'
      disabled={projectCompleted}
    />
  )
}
