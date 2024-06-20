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
import { statusSandboxOrWaitlist } from 'utils/helpers'

export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const { _id: userId, payment, projects } = useAppSelector(selectAuthUser)
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const dispatch = useAppDispatch()

  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      resetTicketFields({
        createdBy: statusSandboxOrWaitlist(payment, projects)
          ? 'edwardEngineer'
          : userId,
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
