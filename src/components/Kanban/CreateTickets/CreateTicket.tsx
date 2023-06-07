import { Button, Box, FormControl, Icon } from '@mui/material'

import { useState } from 'react'
import Modal from '@mui/material/Modal'
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
import TextFieldData from './TextFieldData'
import { MdOutlineTitle } from 'react-icons/md'
import { BiLink } from 'react-icons/bi'
import { UserAssignee } from '../TicketDetail/UserAssignee'
import { RxPerson } from 'react-icons/rx'
import { SelectDate } from '../TicketDetail/SelectDate'
import { TbPencilMinus } from 'react-icons/tb'

export const CreateTicket = ({
  setGetAllTicket,
  getAllTicket,
  concatenatedString,
  ticketsStatus,
  projectId,
  buttonText,
  buttonClassName,
}: createTicketInterface) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [addTicketForm, setAddTicketForm] = useState<TaskInterface>()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isBeingCreated, setIsBeingCreated] = useState<boolean>(false)
  const authUser = useAppSelector(selectAuthUser)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <button
        onClick={openModal}
        className={buttonClassName ?? 'createTicketButton'}
      >
        <Icon {...label} component={AddIcon} />
        {buttonText}
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
                      className='EditableText-textField'
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

                  <Box className='ticketDetail-openModal-box-button '>
                    <button
                      className='button1'
                      disabled={false}
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={false}
                      onClick={() => addTickets()}
                      className='button2'
                      style={{ backgroundColor: '#FA9413', color: 'black' }}
                    >
                      Add a ticket
                    </button>
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
