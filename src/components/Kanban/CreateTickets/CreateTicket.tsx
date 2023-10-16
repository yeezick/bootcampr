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
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import '../Ticket.scss'
import TextFieldData from './TextFieldData'
import { BiLink } from 'react-icons/bi'
import { UserAssignee } from '../TicketDetail/UserAssignee'
import { RxPerson, RxText } from 'react-icons/rx'
import { SelectDate } from '../TicketDetail/SelectDate'
import { TbPencilMinus } from 'react-icons/tb'
import { getMembersAttributesByProjectId } from 'utils/api'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { concatenatedString } from 'utils/helpers/stringHelpers'

export const CreateTicket = ({
  setGetAllTicket,
  getAllTicket,
  ticketsStatus,
  projectId,
  buttonText,
  buttonClassName,
  projectMembers,
}: CreateTicketInterface) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [addTicketForm, setAddTicketForm] = useState<TaskInterface>()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isBeingCreated, setIsBeingCreated] = useState<boolean>(false)
  const authUser = useAppSelector(selectAuthUser)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const [assigneesOptions, setAssigneesOptions] = useState([])
  const [assignee, setAssignee] = useState('Unassigned')

  const getAssignees = async (projectId, attributes) => {
    let assignees = await getMembersAttributesByProjectId(projectId, attributes)
    setAssigneesOptions(assignees)
  }

  useEffect(() => {
    const attributesForAssignees = 'firstName,lastName,role,profilePicture'
    getAssignees(projectId, attributesForAssignees)
  }, [projectId])
  const dispatch = useDispatch()

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
      assignee: assignee,
    })
    setGetAllTicket({
      ...getAllTicket,
      [newStatus]: [...getAllTicket[newStatus], { ...createdTicket }],
    })
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
            <Box className='ticketDetailOpenModalBox'>
              <IoMdClose className='close-x' onClick={closeModal} />
              <Box className='createTicketBox'>
                <Box>
                  <TextFieldData
                    name={'title'}
                    text='Title'
                    detailIcon={<RxText />}
                    placeholderText={'Ex, User interviews'}
                    handleOnChange={handleOnChange}
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
                <Box className='createTicketStatusUser'>
                  <SelectStatus
                    handleOnChange={handleOnChange}
                    ticketsStatus={ticketsStatus}
                  />
                  <UserAssignee
                    text='Assignee'
                    detailIcon={<RxPerson />}
                    projectMembers={assigneesOptions}
                    setAssignee={setAssignee}
                    assignee={'Unassigned'}
                  />
                  <SelectDate handleOnChange={handleOnChange} />

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
                </Box>
              </Box>
            </Box>
          )}
        </div>
      </Modal>
    </div>
  )
}
