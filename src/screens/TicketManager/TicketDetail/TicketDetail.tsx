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
  fakeDataDetail,
  allFakeData,
  setFakeApi,
  sectionName,
}: any) => {
  Modal.setAppElement('#root')
  const [assignees, setAssignees] = useState<any>(
    fakeDataDetail?.assignees.title
  )

  const [modalIsOpen, setIsOpen] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<any>()
  const tittleRef: any = useRef(null)
  const dateRef: any = useRef(null)
  const linkRef: any = useRef(null)
  const descriptionRef: any = useRef(null)
  const statusRef: any = useRef(null)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const saveChanges = () => {
    const updateText = {
      assignees: assignees.user ?? fakeDataDetail.assignees,
      date: dateRef.current.value,
      description: descriptionRef.current.textContent,
      id: fakeDataDetail.id,
      link: linkRef.current.textContent,
      status: ticketStatus ?? fakeDataDetail.status,
      title: tittleRef.current.textContent,
    }

    const { status, id } = fakeDataDetail
    if (ticketStatus === status) return ticketStatusHasNotChange()
    if (ticketStatus != status) return ticketStatusChange()
  }

  const ticketStatusChange = () => {}
  const ticketStatusHasNotChange = () => {}
  const handleEditChange = (e: any) => {
    setTicketStatus(e.target.value)
  }

  const deleteTicket = (id: any) => {
    const deletedTicket = allFakeData[sectionName].filter(
      (ticket: any) => ticket.id !== id
    )
    setFakeApi({ ...allFakeData, [sectionName]: [...deletedTicket] })
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
                {fakeDataDetail.title}
              </p>
            </blockquote>
            <h3>description</h3>

            <blockquote>
              <p
                contentEditable='true'
                ref={descriptionRef}
                suppressContentEditableWarning={true}
              >
                {fakeDataDetail.description}
              </p>
            </blockquote>
            <h3>Link</h3>

            <blockquote>
              <p
                contentEditable='true'
                ref={linkRef}
                suppressContentEditableWarning={true}
              >
                {fakeDataDetail.link}
              </p>
            </blockquote>
          </Box>

          <Box sx={{ width: '50%' }}>
            <SingleSelect
              statusRef={statusRef}
              handleOnChange={handleEditChange}
              fakeDataDetail={fakeDataDetail}
            />
            <SingleAssignees
              setAssignees={setAssignees}
              assignees={assignees}
              fakeDataDetail={fakeDataDetail}
            />
            <input
              type='date'
              name='date'
              ref={dateRef}
              defaultValue={fakeDataDetail.date}
            />
          </Box>
        </Box>
        <Box></Box>
        <Button
          sx={{ marginRight: '10px' }}
          color='error'
          disabled={false}
          size='small'
          variant='outlined'
          onClick={() => deleteTicket(fakeDataDetail?.id)}
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
