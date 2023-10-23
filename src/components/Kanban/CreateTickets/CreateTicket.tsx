import { Box, Icon } from '@mui/material'

import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { SelectStatus } from 'components/Kanban'
import AddIcon from '@mui/icons-material/Add'
import {
  CreateTicketInterface,
  TaskInterface,
} from 'interfaces/TicketInterFace'
import { createTicketApi } from 'utils/api/tickets'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'
import '../Ticket.scss'
import TextFieldData from './TextFieldData'
import { BiLink } from 'react-icons/bi'
import { RxPerson, RxText } from 'react-icons/rx'
import { SelectDate } from '../TicketDetail/SelectDate'
import { TbPencilMinus } from 'react-icons/tb'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { concatenatedString } from 'utils/helpers/stringHelpers'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import { AssignUser } from '../TicketDetail/AssignUser'
import {
  selectTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'

export const TicketTextFields = ({ handleInputChange }) => {
  return (
    <Box>
      <TextFieldData
        name={'title'}
        text='Title'
        detailIcon={<RxText />}
        placeholderText={'Ex, User interviews'}
        handleOnChange={handleInputChange}
      />
      <Box className='EditableText'>
        <div className='EditableTextIconText'>
          <Icon>
            <TbPencilMinus />
          </Icon>
          <h4>Description</h4>
        </div>
        <TextField
          className='EditableTextTextField'
          type='text'
          id='outlined-basic'
          variant='outlined'
          multiline
          placeholder='Give a description of the task.
          You may want to include user stories:
          As a _______, I want to _________, so that I can ________.'
          name='description'
          onChange={handleInputChange}
          InputProps={{ rows: 4.5 }}
        />
      </Box>
      <TextFieldData
        detailIcon={<BiLink />}
        text='Link'
        name={'link'}
        placeholderText={'Add a link'}
        handleOnChange={handleInputChange}
      />
    </Box>
  )
}

export const TicketStatusFields = ({
  handleInputChange,
  closeModal,
  ticketsStatus,
}) => {
  const [assignee, setAssignee] = useState('Unassigned')
  const [isBeingCreated, setIsBeingCreated] = useState<boolean>(false)

  return (
    <Box className='createTicketStatusUser'>
      <SelectStatus
        handleOnChange={handleInputChange}
        ticketsStatus={ticketsStatus}
      />
      <AssignUser
        text='Assignee'
        detailIcon={<RxPerson />}
        setAssignee={setAssignee}
        assignee={'Unassigned'}
      />
      <SelectDate handleOnChange={handleInputChange} />
      <CreateTaskButtons
        assignee={assignee}
        closeModal={closeModal}
        isBeingCreated={isBeingCreated}
        setIsBeingCreated={setIsBeingCreated}
        ticketsStatus={ticketsStatus}
      />
    </Box>
  )
}

export const CreateTaskButtons = ({
  assignee,
  closeModal,
  isBeingCreated,
  setIsBeingCreated,
  ticketsStatus,
}) => {
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useDispatch()

  const addTickets = async () => {
    setIsBeingCreated(true)
    // Add ticket form should always be set to ticketStatus => can immediately concatenate here
    const status = ticketFields?.status ?? ticketsStatus
    const newStatus = concatenatedString(status)
    const createdTicket = await createTicketApi({
      ...ticketFields,
      projectId: projectId,
      status: newStatus,
      createdBy: userId,
      assignee: assignee,
    })
    // TODO: Dispatch to reducer
    // Add to visible tickets
    // setGetAllTicket({
    //   ...getAllTicket,
    //   [newStatus]: [...getAllTicket[newStatus], { ...createdTicket }],
    // })
    setIsBeingCreated(false)
    dispatch(
      createSnackBar({
        isOpen: true,
        message: 'Ticket created successfully',
        duration: 3000,
        severity: 'success',
      })
    )
    closeModal()
  }

  return (
    <Box className='ticketDetail-openModal-box-button '>
      <button
        className='button1'
        disabled={isBeingCreated}
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        onClick={addTickets}
        disabled={isBeingCreated}
        className='button2'
        style={{ backgroundColor: '#FA9413', color: 'black' }}
      >
        Create task
      </button>
    </Box>
  )
}

// Convert to MUI button
export const CreateTicketTab = () => {
  const dispatch = useAppDispatch()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const openCreateTicketDialog = () =>
    dispatch(setVisibleTicketDialog('create'))

  return (
    <button onClick={openCreateTicketDialog} className={'createTicketButton'}>
      <Icon {...label} component={AddIcon} />
      <p>Create Ticket</p>
    </button>
  )
}
