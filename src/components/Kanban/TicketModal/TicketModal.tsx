import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Box, Modal } from '@mui/material'
import { SelectStatus } from 'components/Kanban'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { deleteTicketApi } from 'utils/api/tickets'
import EditableText from './EditableText'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import { RxPerson, RxText } from 'react-icons/rx'
import { AssignUser } from './AssignUser'
import { SelectDate } from './SelectDate'
import '../Ticket.scss'
import { Comments } from '../Components/Comments'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { deleteTicket, selectProjectId } from 'utils/redux/slices/projectSlice'

export const TicketModal = ({ visibleTicketModal, setVisibleTicketModal }) => {
  const handleCloseModal = () => setVisibleTicketModal(false)

  useEffect(() => {
    // fill in ticket fields from redux if an existing ticket
  }, [])

  return (
    <Modal
      open={visibleTicketModal}
      onClose={handleCloseModal}
      className='modal'
    >
      <Box className='ticketDetailOpenModalBox'>
        <Box sx={{ display: 'flex' }}>
          <TicketDetailInputsAndComments />
          <Box>
            <SelectStatus />
            <AssignUser text='Assignee' detailIcon={<RxPerson />} />
            <SelectDate />
            <TicketDetailButtons handleCloseModal={handleCloseModal} />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export const TicketDetailInputsAndComments = () => {
  const {
    description,
    link,
    _id: ticketId,
    title,
  } = useAppSelector(selectTicketFields)
  const descriptionRef: TextRefInterface = useRef(null)
  const linkRef: TextRefInterface = useRef(null)
  const titleRef: TextRefInterface = useRef(null)

  return (
    <Box sx={{ width: '50%', margin: '25px' }}>
      <EditableText
        detailIcon={<RxText />}
        text='Title'
        editRef={titleRef}
        ticketDetail={title}
      />
      <EditableText
        detailIcon={<TbPencilMinus />}
        text='Description'
        editRef={descriptionRef}
        ticketDetail={description}
      />

      <EditableText
        detailIcon={<BiLink />}
        text='Link'
        editRef={linkRef}
        ticketDetail={link}
      />
      {/* Comments should not be here? maybe in a higher level component */}
      <Comments ticketId={ticketId} />
    </Box>
  )
}

// TODO: Move modal to board columns, not each ticket detail
export const TicketDetailButtons = ({ handleCloseModal }) => {
  const ticketFields = useAppSelector(selectTicketFields)
  const projectId = useAppSelector(selectProjectId)
  const dispatch = useAppDispatch()

  const handleDeleteTicket = async () => {
    const { status, _id: ticketId } = ticketFields
    // TODO: add guard clause for tickets that failed to delete
    const deletedtTicket = await deleteTicketApi({
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

  const handleSaveChanges = () => {
    // Call API to save changes
    // update ticket details
    // If status has changed => dispatch to change ticket columns
  }

  return (
    <Box className='ticketDetailOpenModalBoxButton '>
      <button
        className='ticketDetailOpenModalButton button1'
        disabled={false}
        onClick={handleDeleteTicket}
      >
        Delete
      </button>
      <button
        className='ticketDetailOpenModalButton button2'
        style={{ backgroundColor: '#8048c8', color: 'white' }}
        disabled={false}
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </Box>
  )
}

export type TextRefInterface = MutableRefObject<HTMLParagraphElement | null>
