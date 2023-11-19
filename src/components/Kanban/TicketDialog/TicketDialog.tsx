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
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import {
  addTicketToStatus,
  deleteTicket,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { TicketInterface } from 'interfaces'

export const TicketDialog = () => {
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const dispatch = useAppDispatch()
  const handleCloseModal = () => dispatch(setVisibleTicketDialog(''))

  return (
    <Modal
      open={visibleTicketDialog}
      onClose={handleCloseModal}
      className='modal'
    >
      <Box className='ticketDetailOpenModalBox'>
        <Box sx={{ display: 'flex' }}>
          <TicketDetailInputsAndComments />
          <Box>
            <SelectStatus />
            <SelectUser detailIcon={<RxPerson />} />
            <SelectDate />
            <TicketDetailButtons handleCloseModal={handleCloseModal} />
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

// TODO: Move modal to board columns, not each ticket detail
export const TicketDetailButtons = ({ handleCloseModal }) => {
  const ticketDialogState = useAppSelector(selectTicketDialogState)
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  let ctaButtonText =
    ticketDialogState === 'edit' ? 'Save Changes' : 'Create Ticket'

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
    handleCloseModal()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Add ticket form should always be set to ticketStatus => can immediately concatenate here
    let ticketPayload: TicketInterface = {
      projectId,
      createdBy: userId,
    }

    if (!ticketFields.assignee || ticketFields.assignee === 'Unassigned') {
      const { assignee, ...remainingFields } = ticketFields
      ticketPayload = { ...remainingFields, ...ticketPayload, assignee: '' }
    } else {
      ticketPayload = { ...ticketFields, ...ticketPayload }
    }

    const ticketResponse =
      ticketDialogState === 'create'
        ? await createTicket(ticketPayload)
        : await saveUpdatedTicket(ticketPayload)

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
      handleCloseModal()
    }
  }

  return (
    <Box className='ticketDetailOpenModalBoxButton '>
      {ticketDialogState === 'edit' && (
        <button
          className='ticketDetailOpenModalButton button1'
          disabled={false}
          onClick={handleDeleteTicket}
        >
          Delete
        </button>
      )}
      <button
        className='ticketDetailOpenModalButton button2'
        style={{ backgroundColor: '#8048c8', color: 'white' }}
        disabled={false}
        onClick={handleSubmit}
      >
        {ctaButtonText}
      </button>
    </Box>
  )
}

export type TextRefInterface = MutableRefObject<HTMLParagraphElement | null>
