import { Box, Icon } from '@mui/material'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { SelectStatus } from 'components/Kanban'
import AddIcon from '@mui/icons-material/Add'
import { createTicketApi } from 'utils/api/tickets'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'
import '../Ticket.scss'
import TextFieldData from './TextFieldData'
import { BiLink } from 'react-icons/bi'
import { RxPerson, RxText } from 'react-icons/rx'
import { SelectDate } from '../TicketDetail/SelectDate'
import { TbPencilMinus } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { concatenatedString } from 'utils/helpers/stringHelpers'
import {
  addTicketToStatus,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { AssignUser } from '../TicketDetail/AssignUser'
import {
  selectTicketFields,
  setTicketFields,
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
      <SelectStatus />
      <AssignUser text='Assignee' detailIcon={<RxPerson />} />
      <SelectDate handleOnChange={handleInputChange} />
      <CreateTaskButtons
        closeModal={closeModal}
        isBeingCreated={isBeingCreated}
        setIsBeingCreated={setIsBeingCreated}
      />
    </Box>
  )
}

export const CreateTaskButtons = ({
  closeModal,
  isBeingCreated,
  setIsBeingCreated,
}) => {
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useDispatch()

  const addTickets = async () => {
    setIsBeingCreated(true)
    // Add ticket form should always be set to ticketStatus => can immediately concatenate here
    const createdTicket = await createTicketApi({
      ...ticketFields,
      projectId: projectId,
      createdBy: userId,
    })
    // TODO: Dispatch to reducer
    // Add to visible tickets
    console.log('createdTicket', createdTicket)
    dispatch(addTicketToStatus(createdTicket))
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
export const CreateTicketTab = ({ columnStatus }) => {
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      setTicketFields({
        assignee: 'Unassigned',
        createdBy: userId,
        status: columnStatus,
        projectId,
      })
    )
  }

  return (
    <button onClick={openCreateTicketDialog} className={'createTicketButton'}>
      <Icon {...label} component={AddIcon} />
      <p>Create Ticket</p>
    </button>
  )
}
