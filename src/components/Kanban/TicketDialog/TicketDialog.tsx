import { MutableRefObject } from 'react'
import { Box, Modal } from '@mui/material'
import { SelectStatus } from 'components/Kanban'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  createTicket,
  deleteTicketApi,
  saveUpdatedTicket,
} from 'utils/api/tickets'
import EditableText from './EditableText'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import { RxPerson, RxText } from 'react-icons/rx'
import { SelectUser } from './SelectUser'
import { SelectDate } from './SelectDate'
import '../Ticket.scss'
import { Comments } from '../Components/Comments'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import {
  emptyTicketFields,
  selectTicketDialogState,
  selectTicketFields,
  selectVisibleTicketDialog,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import {
  addTicketToStatus,
  deleteTicket,
  selectProjectId,
  updateTicket,
} from 'utils/redux/slices/projectSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { TicketInterface } from 'interfaces'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { handleCloseVisibleTicketDialog } from 'utils/helpers/taskHelpers'

export const TicketDialog = () => {
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => handleCloseVisibleTicketDialog(dispatch)

  return (
    <Modal
      open={visibleTicketDialog}
      onClose={handleCloseDialog}
      className='modal'
    >
      <Box className='ticketDetailOpenModalBox'>
        <Box sx={{ display: 'flex' }}>
          <TicketDetailInputsAndComments />
          <Box>
            <SelectStatus />
            <SelectUser detailIcon={<RxPerson />} />
            <SelectDate />
            <TicketDetailButtons />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export const TicketDetailInputsAndComments = () => {
  const { _id: ticketId } = useAppSelector(selectTicketFields)

  return (
    <Box sx={{ width: '50%', margin: '25px' }}>
      <EditableText inputIcon={<RxText />} label='Title' field={'title'} />
      <EditableText
        inputIcon={<TbPencilMinus />}
        label='Description'
        field={'description'}
      />

      <EditableText inputIcon={<BiLink />} label='Link' field={'link'} />
      {/* Comments should not be here? maybe in a higher level component */}
      <Comments ticketId={ticketId} />
    </Box>
  )
}

export const TicketDetailButtons = () => {
  const ticketDialogState = useAppSelector(selectTicketDialogState)

  return (
    <Box className='ticketDetailOpenModalBoxButton '>
      {ticketDialogState === 'edit' ? (
        <>
          <DeleteTicketBtn />
          <SaveTicketBtn />
        </>
      ) : (
        <CreateTicketBtn />
      )}
    </Box>
  )
}

const DeleteTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => handleCloseVisibleTicketDialog(dispatch)

  const handleDeleteTicket = async () => {
    const { status, _id: ticketId } = ticketFields
    // TODO: add guard clause for tickets that failed to delete & display error toast
    await deleteTicketApi({
      ticketId,
      status,
      projectId,
    })

    dispatch(deleteTicket({ status, ticketId }))
    dispatch(
      createSnackBar({
        isOpen: true,
        message: 'Ticket deleted successfully',
        duration: 3000,
        vertical: 'bottom',
        horizontal: 'right',
        snackbarStyle: { background: 'green', color: 'white' },
        severity: 'success',
      })
    )
    handleCloseDialog()
  }

  return <SecondaryButton handler={handleDeleteTicket} text={'Delete ticket'} />
}
const SaveTicketBtn = () => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => handleCloseVisibleTicketDialog(dispatch)

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

  return <PrimaryButton handler={handleSaveTicket} text={'Save Changes'} />
}

const CreateTicketBtn = () => {
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

const buildTicketPayload = (projectId, userId, ticketFields) => {
  let ticketPayload: TicketInterface = {
    projectId,
    createdBy: userId,
  }

  // Determine if there is a valid value for Assignee
  if (!ticketFields.assignee || ticketFields.assignee === 'Unassigned') {
    const { assignee, ...remainingFields } = ticketFields
    ticketPayload = { ...remainingFields, ...ticketPayload }
  } else {
    ticketPayload = { ...ticketFields, ...ticketPayload }
  }

  return ticketPayload
}

export type TextRefInterface = MutableRefObject<HTMLParagraphElement | null>
