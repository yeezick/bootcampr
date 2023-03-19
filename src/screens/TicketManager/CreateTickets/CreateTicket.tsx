import { Button, Box, FormControl } from '@mui/material'

import { useState } from 'react'
import Modal from 'react-modal'
import MultipleAssignees from './MultipleAssignees'
import TextField from '@mui/material/TextField'
import SingleSelect from './SingleSelect'

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

export const CreateTicket = ({ setFakeApi, fakeApiData }: any) => {
  Modal.setAppElement('#root')
  const [addTicketForm, setAddTicketForm] = useState<any>({})
  const [modalIsOpen, setIsOpen] = useState(false)
  const [assignees, setAssignees] = useState<any>([])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  function handleOnChange(e: any) {
    e.preventDefault()

    setAddTicketForm({
      ...addTicketForm,
      [e.target.name]: e.target.value,
      id: Date.now(),
    })
  }

  const addTickets = () => {
    const { status = 'To Do' } = addTicketForm
    setFakeApi({
      ...fakeApiData,
      [status]: [
        ...fakeApiData[status],
        { ...addTicketForm, assignees: [...assignees] },
      ],
    })
  }

  return (
    <div>
      <button onClick={openModal}>Create a ticket</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <h1>Create a ticket</h1>

          <FormControl>
            <Box sx={{ display: 'flex', gap: '30px' }}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  sx={{ width: '100%', paddingBottom: '20px' }}
                  type='text'
                  label='Title'
                  id='outlined-basic'
                  variant='outlined'
                  name='title'
                  onChange={e => handleOnChange(e)}
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
                  onChange={e => handleOnChange(e)}
                  InputProps={{ rows: 4.5 }}
                />
                <SingleSelect handleOnChange={handleOnChange} />
                <MultipleAssignees
                  setAssignees={setAssignees}
                  assignees={assignees}
                  handleOnChange={handleOnChange}
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
                onClick={() => addTickets()}
              >
                Add a ticket
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
          </FormControl>
        </div>
      </Modal>
    </div>
  )
}
