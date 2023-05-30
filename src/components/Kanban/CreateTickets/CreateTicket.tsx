import { Button, Box, FormControl, Icon } from '@mui/material'

import { useState } from 'react'
import Modal from 'react-modal'
import TextField from '@mui/material/TextField'
import { SelectStatus } from 'components/Kanban'
import AddIcon from '@mui/icons-material/Add'

import {
  createTicketInterface,
  TaskInterface,
} from 'interfaces/TicketInterFace'
import { createTicketApi } from 'utils/api/tickets'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import '../Ticket.scss'

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
  concatenatedString,
  ticketsStatus,
  projectId,
}: createTicketInterface) => {
  Modal.setAppElement('#root')
  const [addTicketForm, setAddTicketForm] = useState<TaskInterface>()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isBeingCreated, setIsBeingCreated] = useState<boolean>(false)
  const authUser = useAppSelector(selectAuthUser)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setAddTicketForm({
      ...addTicketForm,
      [e.target.name]: e.target.value,
    })
  }

  const addTickets = async () => {
    setIsBeingCreated(true)
    const status = addTicketForm?.status ?? ticketsStatus
    const newStatus = concatenatedString(status)

    const createdTicket = await createTicketApi({
      ...addTicketForm,
      projectId: projectId,
      status: newStatus,
      createdBy: authUser._id,
    })

    setGetAllTicket({
      ...getAllTicket,
      [newStatus]: [...getAllTicket[newStatus], { ...createdTicket }],
    })
    setIsBeingCreated(false)

    closeModal()
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <div>
      <button onClick={openModal} className='createTicketButton'>
        <Icon {...label} component={AddIcon} />
        Create task
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <h1>Create a ticket</h1>
          {isBeingCreated ? (
            <h1>Creating...</h1>
          ) : (
            <FormControl>
              <Box className='createTicketBox'>
                <Box sx={{ width: '50%' }}>
                  <TextField
                    className='textFieldStyle'
                    type='text'
                    label='Title'
                    id='outlined-basic'
                    variant='outlined'
                    name='title'
                    onChange={handleOnChange}
                  />
                  <TextField
                    className='textFieldStyle'
                    type='text'
                    label='link'
                    id='outlined-basic'
                    variant='outlined'
                    name='link'
                    onChange={handleOnChange}
                  />
                  <input type='date' name='dueDate' onChange={handleOnChange} />
                  <p>
                    createdBy:{authUser?.firstName}
                    <img src={authUser.profilePicture} alt='auth' />
                  </p>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <TextField
                    className='textFieldStyle'
                    type='text'
                    id='outlined-basic'
                    label='Description'
                    variant='outlined'
                    multiline
                    name='description'
                    onChange={handleOnChange}
                    InputProps={{ rows: 4.5 }}
                  />
                  <SelectStatus
                    handleOnChange={handleOnChange}
                    ticketsStatus={ticketsStatus}
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
          )}
        </div>
      </Modal>
    </div>
  )
}
