import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import {
  resetTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { CreateTaskButton } from 'components/Buttons'

export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const {
    _id: userId,
    payment: { experience },
  } = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      resetTicketFields({
        createdBy: experience === 'sandbox' ? 'starStruck' : userId,
        status: columnStatus,
        projectId,
      })
    )
  }

  return (
    <CreateTaskButton onClick={openCreateTicketDialog} label='Create story' />
  )
}
