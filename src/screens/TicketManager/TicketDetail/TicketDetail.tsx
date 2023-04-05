import React, { useState, useRef, LegacyRef } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { Button, Box } from '@mui/material'
import SingleAssignees from '../CreateTickets/SingleAssignees'
import SingleSelect from '../CreateTickets/SingleSelect'
import TextField from '@mui/material/TextField'

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
}: any) => {
  Modal.setAppElement('#root')
  const [assignees, setAssignees] = useState<any>({
    value: ticketDetail?.assignees.title,
    user: '',
  })

  const [modalIsOpen, setIsOpen] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<any>()
  const tittleRef: any = useRef(null)
  const dateRef: any = useRef(null)
  const linkRef: any = useRef(null)
  const descriptionRef: any = useRef(null)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const saveChanges = () => {
    const updateText = {
      assignees: assignees.user ?? ticketDetail.assignees,
      date: dateRef.current.value,
      description: descriptionRef.current.textContent,
      id: ticketDetail.id,
      link: linkRef.current.textContent,
      status: ticketStatus ?? ticketDetail.status,
      title: tittleRef.current.textContent,
    }
    const { status, id } = ticketDetail
    if ((ticketStatus ?? ticketDetail.status) === status)
      return ticketStatusHasNotChange(updateText)
    if ((ticketStatus ?? ticketDetail.status) != status)
      return ticketStatusChange(updateText)
  }

  const ticketStatusHasNotChange = (updateText: any) => {
    const editData = getAllTicket[ticketDetail.status]?.map((data: any) => {
      if (String(data.id) === String(ticketDetail.id)) {
        data = {
          ...updateText,
        }
      }
      return data
    })

    setGetAllTicket({
      ...getAllTicket,
      [ticketDetail.status]: [...editData],
    })
    closeModal()
  }

  const ticketStatusChange = (updateText: any) => {
    const { status, id } = updateText
    const removeFromSection = getAllTicket[ticketDetail.status].filter(
      (newStatus: any) => newStatus.id !== id
    )
    const addToNewSection = [
      ...getAllTicket[status],
      {
        ...updateText,
      },
    ]
    setGetAllTicket({
      ...getAllTicket,
      [ticketDetail.status]: [...removeFromSection],
      [status]: [...addToNewSection],
    })
    closeModal()
  }

  const handleEditChange = (e: any) => {
    setTicketStatus(e.target.value)
  }

  const deleteTicket = (id: any) => {
    const deletedTicket = getAllTicket[ticketsStatus].filter(
      (ticket: any) => ticket.id !== id
    )
    setGetAllTicket({ ...getAllTicket, [ticketsStatus]: [...deletedTicket] })
    closeModal()
  }

  return (
    <div>
      <button onClick={openModal}> Ticket Detail</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
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
            />
            <SingleAssignees
              setAssignees={setAssignees}
              assignees={assignees}
              ticketDetail={ticketDetail}
            />
            <input
              type='date'
              name='date'
              ref={dateRef}
              defaultValue={ticketDetail.date}
            />
          </Box>
        </Box>

        <Button
          sx={{ marginRight: '10px' }}
          color='error'
          disabled={false}
          size='small'
          variant='outlined'
          onClick={() => deleteTicket(ticketDetail?.id)}
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
      </Modal>
    </div>
  )
}

export default TicketDetail
