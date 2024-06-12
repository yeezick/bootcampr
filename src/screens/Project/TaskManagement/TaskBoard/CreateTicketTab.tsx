import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectProjectId,
  selectProjectPresented,
} from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { isPaidActiveExperience } from 'utils/helpers/taskHelpers'
import { CreateTaskButton } from 'components/Buttons'

export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const { _id: userId, payment } = useAppSelector(selectAuthUser)
  const projectPresented = useAppSelector(selectProjectPresented)
  const dispatch = useAppDispatch()

  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      resetTicketFields({
        createdBy: isPaidActiveExperience(payment) ? userId : 'edwardEngineer',
        status: columnStatus,
        projectId,
      })
    )
  }

  return (
    <CreateTaskButton
      onClick={openCreateTicketDialog}
      label='Create story'
      disabled={projectPresented}
    />
  )
}
