import { Button, Box, FormControl } from '@mui/material'

import { useState } from 'react'
import Modal from 'react-modal'
import SingleAssignees from './SingleAssignees'
import TextField from '@mui/material/TextField'
import SingleSelect from './SingleSelect'
import { TaskInterface } from '../../../utilities/types/TicketInterFace'
import {
  createTicketInterface,
  TicketStatusType,
} from 'utilities/types/TicketInterFace'

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

export const CreateTicket = ({
  setGetAllTicket,
  getAllTicket,
}: createTicketInterface) => {
  Modal.setAppElement('#root')
  const [addTicketForm, setAddTicketForm] = useState<TaskInterface>()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [assignees, setAssignees] = useState<any>()

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setAddTicketForm({
      ...addTicketForm,
      [e.target.name]: e.target.value,
      id: Date.now().toString(),
    })
  }

  const addTickets = () => {
    setGetAllTicket({
      ...getAllTicket,
      [addTicketForm?.status ?? 'To Do']: [
        ...getAllTicket[status as TicketStatusType],
        { ...addTicketForm, assignees: assignees.user },
      ],
    })
    closeModal()
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e)
                  }
                />
                <TextField
                  sx={{ width: '100%', paddingBottom: '20px' }}
                  type='text'
                  label='link'
                  id='outlined-basic'
                  variant='outlined'
                  name='link'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e)
                  }
                />
                <input
                  type='date'
                  name='date'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e)
                  }
                  InputProps={{ rows: 4.5 }}
                />
                <SingleSelect handleOnChange={handleOnChange} />
                <SingleAssignees
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
