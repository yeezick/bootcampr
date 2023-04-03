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
  fakeData,
  fakeApiData,
  setFakeApi,
  sectionName,
}: any) => {
  Modal.setAppElement('#root')
  const [assignees, setAssignees] = useState<any>([])

  const [modalIsOpen, setIsOpen] = useState(false)
  const tittleRef: any = useRef(null)
  const descriptionRef: any = useRef(null)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const deleteTicket = (id: any) => {
    const deletedTicket = fakeApiData[sectionName].filter(
      (ticket: any) => ticket.id !== id
    )
    setFakeApi({ ...fakeApiData, [sectionName]: [...deletedTicket] })
    closeModal()
  }

  const saveChanges = (id: any) => {
    console.log(tittleRef.current.textContent)
    console.log(descriptionRef.current.textContent)
  }

  const handleEditChange = (e: any) => {
    console.log(e)
  }

  const formatDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
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
                {fakeData.title}
              </p>
            </blockquote>
            <h3>description</h3>

            <blockquote>
              <p
                contentEditable='true'
                ref={descriptionRef}
                suppressContentEditableWarning={true}
              >
                {fakeData.description}
              </p>
            </blockquote>
            <h3>Link</h3>

            <blockquote>
              <p
                contentEditable='true'
                ref={descriptionRef}
                suppressContentEditableWarning={true}
              >
                {fakeData.description}
              </p>
            </blockquote>
          </Box>

          <Box sx={{ width: '50%' }}>
            <SingleSelect
              handleOnChange={handleEditChange}
              editTicketForm={fakeData}
            />
            <SingleAssignees
              setAssignees={setAssignees}
              assignees={assignees}
              editTicketForm={fakeData}
            />
            <input
              type='date'
              value={formatDate()}
              onChange={e => handleEditChange(e)}
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
          onClick={() => deleteTicket(fakeData?.id)}
        >
          Delete
        </Button>
        <Button
          sx={{ marginRight: '10px' }}
          color='success'
          disabled={false}
          size='small'
          variant='outlined'
          onClick={() => saveChanges(fakeData?.id)}
        >
          Save Changes
        </Button>
      </Modal>
    </div>
  )
}

export default TicketDetail
