import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'
import '../Ticket.scss'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import {
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'

export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()

  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      setTicketFields({
        assignee: 'Unassigned',
        createdBy: userId,
        status: columnStatus,
        projectId,
      })
    )
  }

  return (
    <Button
      className='create-ticket-btn'
      onClick={openCreateTicketDialog}
      startIcon={<AddIcon />}
      variant='contained'
    >
      Create ticket
    </Button>
  )
}
