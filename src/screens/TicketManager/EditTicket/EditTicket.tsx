import { useState } from 'react'
import { Button, Box } from '@mui/material'
import Modal from 'react-modal'
import MultipleAssignees from '../CreateTickets/SingleAssignees'

import TextField from '@mui/material/TextField'
import SingleSelect from '../CreateTickets/SingleSelect'

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

const EditTicket = ({ setFakeApi, fakeApiData, sectionName, fake }: any) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [assignees, setAssignees] = useState<any>([])
  const [editTicketForm, setEditTicketForm] = useState(fake)

  Modal.setAppElement('#root')

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const handleOnChange = (e: any) => {
    e.preventDefault()
    setEditTicketForm({
      ...editTicketForm,
      [e.target.name]: e.target.value,
    })
  }

  const submitEditTicket = () => {
    const { status, id } = editTicketForm
    if (fake.status === status) return ticketStatusHasNotChange()
    if (fake.status != status) return ticketStatusChange()
  }

  const ticketStatusChange = () => {
    const { status, id } = editTicketForm
    const removeFromSection = fakeApiData[fake.status].filter(
      (newStatus: any) => newStatus.id !== id
    )
    const addToNewSection = [
      ...fakeApiData[status],
      {
        ...editTicketForm,
        assignees: assignees.length ? assignees : [...fake.assignees],
      },
    ]
    setFakeApi({
      ...fakeApiData,
      [fake.status]: [...removeFromSection],
      [status]: [...addToNewSection],
    })
  }

  const ticketStatusHasNotChange = () => {
    const editData = fakeApiData[fake.status]?.map((data: any) => {
      if (String(data.id) === String(fake.id)) {
        data = {
          ...editTicketForm,
          assignees: assignees.length ? assignees : [...data.assignees],
        }
      }
      return data
    })
    console.log([fake])
    console.log(editData)

    setFakeApi({
      ...fakeApiData,
      [fake.status]: [...editData],
    })
  }

  return (
    <div>
      <button onClick={openModal}>Edit a ticket</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <h1>Edit a ticket</h1>

          <Box sx={{ display: 'flex', gap: '30px' }}>
            <Box sx={{ width: '50%' }}>
              <TextField
                sx={{ width: '100%', paddingBottom: '20px' }}
                type='text'
                label='Title'
                name='title'
                id='outlined-basic'
                variant='outlined'
                value={editTicketForm.title}
                onChange={handleOnChange}
              />
            </Box>

            <Box sx={{ width: '50%' }}>
              <TextField
                sx={{ width: '100%', paddingBottom: '20px' }}
                type='text'
                id='outlined-basic'
                label='Description'
                variant='outlined'
                multiline
                name='description'
                InputProps={{ rows: 4.5 }}
                value={editTicketForm.description}
                onChange={handleOnChange}
              />
              <SingleSelect handleOnChange={handleOnChange} />
              <MultipleAssignees
                setAssignees={setAssignees}
                assignees={assignees}
              />
            </Box>
          </Box>
          <Box>
            <Button
              sx={{ marginRight: '10px' }}
              color='primary'
              disabled={false}
              size='small'
              variant='outlined'
              // size="12px"
              onClick={() => submitEditTicket()}
            >
              Edit a ticket
            </Button>
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
          </Box>
        </div>
      </Modal>
    </div>
  )
}
export default EditTicket
