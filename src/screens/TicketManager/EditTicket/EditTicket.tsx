import { useState } from 'react'
import { Card, Button, Box } from '@mui/material'
import Modal from 'react-modal'
import MultipleAssignees from '../CreateTickets/MultipleAssignees'

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
  const [addTicket, setAddTicket] = useState('')
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
      id: Date.now(),
    })

    // console.log(e.target.value)
  }
  const submitEditTicket = () => {
    const { status = 'To Do' } = editTicketForm
    setFakeApi({
      ...fakeApiData,
      [status]: [
        ...fakeApiData[status],
        { ...editTicketForm, assignees: [...assignees] },
      ],
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
              <SingleSelect
                handleOnChange={handleOnChange}
                editForm={editTicketForm}
              />
              <MultipleAssignees
                setAssignees={setAssignees}
                assignees={assignees}
              />
            </Box>
          </Box>
          <Box>
            <Button
              sx={{ 'margin-right': '10px' }}
              color='primary'
              disabled={false}
              size='small'
              variant='outlined'
              // size="12px"
              onClick={() => submitEditTicket()}
            >
              Add a ticket
            </Button>
            <Button
              sx={{ 'margin-right': '10px' }}
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
