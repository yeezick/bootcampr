import { Button, Box, FormControl, Icon } from '@mui/material'

import { useState } from 'react'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { SelectStatus } from 'components/Kanban'
import AddIcon from '@mui/icons-material/Add'
import './CreateTickets.scss'
import {
  createTicketInterface,
  TaskInterface,
} from 'interfaces/TicketInterFace'
import { createTicketApi } from 'utils/api/tickets'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import '../Ticket.scss'
import TextFieldData from './TextFieldData'
import { MdOutlineTitle } from 'react-icons/md'
import { BiLink } from 'react-icons/bi'
import UserAssignee from '../TicketDetail/UserAssignee'
import { RxPerson } from 'react-icons/rx'
import SelectDate from '../TicketDetail/SelectDate'
import { TbPencilMinus } from 'react-icons/tb'

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
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

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

  return (
    <div>
      <button onClick={openModal} className='createTicketButton'>
        <Icon {...label} component={AddIcon} />
        Create task
      </button>
      <Modal open={modalIsOpen} onClose={closeModal} className='modal'>
        <div>
          {isBeingCreated ? (
            <h1>Creating...</h1>
          ) : (
            <Box className='ticketDetail-openModal-box'>
              <Box className='createTicketBox'>
                <Box sx={{ width: '50%' }}>
                  <TextFieldData
                    name={'title'}
                    text='Title'
                    detailIcon={<MdOutlineTitle />}
                    placeholderText={'Ex, User interviews'}
                    handleOnChange={handleOnChange}
                  />
                  <Box className='EditableText'>
                    <div className='EditableText-icon-text'>
                      <Icon>
                        <TbPencilMinus />
                      </Icon>
                      <h4>Description</h4>
                    </div>
                    <TextField
                      className='textFieldStyle'
                      type='text'
                      // detailIcon={<TbPencilMinus />}
                      id='outlined-basic'
                      variant='outlined'
                      multiline
                      placeholder='Give a description of the task.
                      You may want to include user stories:
                      As a _______, I want to _________, so that I can ________.'
                      name='description'
                      onChange={handleOnChange}
                      InputProps={{ rows: 4.5 }}
                    />
                  </Box>
                  <TextFieldData
                    detailIcon={<BiLink />}
                    text='Link'
                    name={'link'}
                    placeholderText={'Add a link'}
                    handleOnChange={handleOnChange}
                  />
                </Box>
                <Box sx={{ width: '50%' }} className='createTicket-status-user'>
                  <SelectStatus
                    handleOnChange={handleOnChange}
                    ticketsStatus={ticketsStatus}
                  />
                  <UserAssignee
                    text='Assignee'
                    detailIcon={<RxPerson />}
                    userName={authUser.firstName}
                    userRole={authUser.role}
                    userImage={authUser.profilePicture}
                  />
                  <SelectDate handleOnChange={handleOnChange} />

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
                </Box>
              </Box>
            </Box>
          )}
        </div>
      </Modal>
    </div>
  )
}
