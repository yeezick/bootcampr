import React, { useState, useRef, MutableRefObject } from 'react'
import Modal from 'react-modal'
import { Button, Box } from '@mui/material'
import SingleAssignees from '../CreateTickets/SingleAssignees'
import SingleSelect from '../CreateTickets/SingleSelect'
import { SelectChangeEvent } from '@mui/material/Select'

import {
  TaskInterface,
  TicketDetailPropsInterface,
} from '../../../interfaces/TicketInterFace'

import {
  ticketStatusChange,
  ticketStatusHasNotChange,
} from './TicketDetailFunctions'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { deleteTicketApi } from 'utils/api/tickets'

const customStyles = {
  content: {
    top: '50%',
    width: '40rem',
    height: '25rem',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '50%',
    transform: 'translate(-50%, -50%)',
  },
}

const TicketDetail = ({
  ticketDetail,
  getAllTicket,
  setGetAllTicket,
  ticketsStatus,
  splitCamelCaseToWords,
  concatenatedString,
}: TicketDetailPropsInterface) => {
  Modal.setAppElement('#root')
  // this needs to be added once the creating a project is done
  // const [assignees, setAssignees] = useState({
  //   value: ticketDetail?.assignees?.title,
  //   user: '',
  // })
  const authUser = useAppSelector(selectAuthUser)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<string>()
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false)

  const tittleRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)
  const dateRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const linkRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)

  const descriptionRef: MutableRefObject<HTMLParagraphElement | null> =
    useRef(null)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const saveChanges = () => {
    const { status } = ticketDetail
    const updateText: TaskInterface = {
      assignees: /* assignees.user ?? ticketDetail.assignees*/ authUser._id,
      date: dateRef.current?.value,
      description: descriptionRef.current?.textContent,
      _id: ticketDetail._id,
      link: linkRef.current?.textContent,
      status: ticketStatus ?? status,
      title: tittleRef.current?.textContent,
    }

    if ((ticketStatus ?? status) === status)
      return ticketStatusHasNotChange({
        updateText,
        getAllTicket,
        ticketDetail,
        closeModal,
        setGetAllTicket,
        setIsBeingEdited,
      })
    if ((ticketStatus ?? status) !== status)
      return ticketStatusChange({
        updateText,
        getAllTicket,
        ticketDetail,
        closeModal,
        setGetAllTicket,
        concatenatedString,
        setIsBeingEdited,
      })
  }

  const handleEditChange = (e: SelectChangeEvent) =>
    setTicketStatus(e.target.value)

  const deleteTicket = async (ticketId: string) => {
    setIsBeingEdited(true)

    const deletedTicket = getAllTicket[ticketsStatus].filter(
      (ticket: TaskInterface) => ticket._id !== ticketId
    )
    await deleteTicketApi({
      ticketId,
      ticketsStatus,
      projectId: ticketDetail.projectId,
    })
    setGetAllTicket({ ...getAllTicket, [ticketsStatus]: [...deletedTicket] })
    setIsBeingEdited(false)

    closeModal()
  }
  // oldStatus, ticketId, projectId
  return (
    <div>
      <button onClick={openModal}> Ticket Detail</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        {isBeingEdited ? (
          <h1>Saving changes...</h1>
        ) : (
          <>
            <Button
              sx={{ marginRight: '10px' }}
              color='error'
              disabled={false}
              size='small'
              variant='outlined'
              onClick={closeModal}
            >
              close
            </Button>
            <Box sx={{ display: 'flex', gap: '30px' }}>
              <Box sx={{ width: '50%' }}>
                <h3>Title</h3>
                <blockquote>
                  <p
                    contentEditable='true'
                    ref={tittleRef}
                    suppressContentEditableWarning={true}
                  >
                    {ticketDetail.title}
                  </p>
                </blockquote>
                <h3>description</h3>

                <blockquote>
                  <p
                    contentEditable='true'
                    ref={descriptionRef}
                    suppressContentEditableWarning={true}
                  >
                    {ticketDetail.description}
                  </p>
                </blockquote>
                <h3>Link</h3>

                <blockquote>
                  <p
                    contentEditable='true'
                    ref={linkRef}
                    suppressContentEditableWarning={true}
                  >
                    {ticketDetail.link}
                  </p>
                </blockquote>
              </Box>

              <Box sx={{ width: '50%' }}>
                <SingleSelect
                  handleOnChange={handleEditChange}
                  ticketDetail={ticketDetail}
                  splitCamelCaseToWords={splitCamelCaseToWords}
                />
                {/* for assignees we need the project to have users in a specific project */}

                {/* <SingleAssignees
                  setAssignees={setAssignees}
                  assignees={assignees}
                  ticketDetail={ticketDetail}
                /> */}
                <input
                  type='date'
                  name='date'
                  ref={dateRef}
                  defaultValue={ticketDetail.dueDate}
                />
              </Box>
            </Box>
            <Button
              sx={{ marginRight: '10px' }}
              color='error'
              disabled={false}
              size='small'
              variant='outlined'
              onClick={() => deleteTicket(ticketDetail?._id)}
            >
              Delete
            </Button>
            <Button
              sx={{ marginRight: '10px' }}
              color='success'
              disabled={false}
              size='small'
              variant='outlined'
              onClick={() => saveChanges()}
            >
              Save Changes
            </Button>
          </>
        )}
      </Modal>
    </div>
  )
}

export default TicketDetail
