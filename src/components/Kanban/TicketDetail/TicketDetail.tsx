import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Box, Modal } from '@mui/material'
import { SelectStatus } from 'components/Kanban'
import { SelectChangeEvent } from '@mui/material/Select'
import { TaskInterface, TicketDetailPropsInterface } from 'interfaces'
import {
  ticketStatusChange,
  ticketStatusHasNotChange,
} from './TicketDetailFunctions'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { deleteTicketApi } from 'utils/api/tickets'
import EditableText from './EditableText'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import { RxPerson, RxText } from 'react-icons/rx'
import { AssignUser } from './AssignUser'
import { SelectDate } from './SelectDate'
import '../Ticket.scss'
import { getMembersAttributesByProjectId } from 'utils/api'
import { Comments } from '../Components/Comments'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { useDispatch } from 'react-redux'

export const TicketDetail = ({
  ticketDetail,
  getAllTicket,
  setGetAllTicket,
  ticketsStatus,
  splitCamelCaseToWords,
  concatenatedString,
  projectId,
}: TicketDetailPropsInterface) => {
  const authUser = useAppSelector(selectAuthUser)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<string>()
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false)
  const [assigneesOptions, setAssigneesOptions] = useState([])
  const [assignee, setAssignee] = useState('Unassigned')
  const tittleRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)
  const dateRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const linkRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)
  const descriptionRef: MutableRefObject<HTMLParagraphElement | null> =
    useRef(null)
  const dispatch = useDispatch()
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const getAssignees = async (projectId, attributes) => {
    let assignees = await getMembersAttributesByProjectId(projectId, attributes)
    setAssigneesOptions(assignees)
    setAssignee(ticketDetail.assignee)
  }

  useEffect(() => {
    const attributesForAssignees = 'firstName,lastName,role,profilePicture'
    getAssignees(projectId, attributesForAssignees)
  }, [])

  const handleSaveChanges = () => {
    const { status } = ticketDetail
    const updateText: TaskInterface = {
      assignee: authUser._id,
      dueDate: dateRef.current?.value,
      description: descriptionRef.current?.textContent,
      // _id: ticketDetail._id,
      link: linkRef.current?.textContent,
      status: ticketStatus ?? status,
      title: tittleRef.current?.textContent,
    }

    if ((ticketStatus ?? status) === status)
      return ticketStatusHasNotChange({
        updateText,
        getAllTicket,
        ticketDetail,
        closeModal,
        setGetAllTicket,
        setIsBeingEdited,
      })
    if ((ticketStatus ?? status) !== status)
      return ticketStatusChange({
        updateText,
        getAllTicket,
        ticketDetail,
        closeModal,
        setGetAllTicket,
        concatenatedString,
        setIsBeingEdited,
      })
  }

  const handleEditChange = (e: SelectChangeEvent) =>
    setTicketStatus(e.target.value)

  const deleteTicket = async (ticketId: string) => {
    setIsBeingEdited(true)

    const deletedTicket = getAllTicket[ticketsStatus].filter(
      (ticket: TaskInterface) => ticket._id !== ticketId
    )
    await deleteTicketApi({
      ticketId,
      ticketsStatus,
      projectId: ticketDetail.projectId,
    })
    setGetAllTicket({ ...getAllTicket, [ticketsStatus]: [...deletedTicket] })
    setIsBeingEdited(false)
    dispatch(
      createSnackBar({
        isOpen: true,
        message: 'Ticket deleted successfully',
        duration: 3000,
        vertical: 'bottom',
        horizontal: 'right',
        snackbarStyle: { background: 'green', color: 'white' },
        severity: 'success',
      })
    )
    closeModal()
  }
  return (
    <div>
      <TicketTab openModal={openModal} ticketDetail={ticketDetail} />
      <Modal open={modalIsOpen} onClose={closeModal} className='modal'>
        {isBeingEdited ? (
          <h1>Saving changes...</h1>
        ) : (
          <>
            <Box className='ticketDetailOpenModalBox'>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%', margin: '25px' }}>
                  <EditableText
                    detailIcon={<RxText />}
                    text='Title'
                    editRef={tittleRef}
                    ticketDetail={ticketDetail.title}
                  />
                  <EditableText
                    detailIcon={<TbPencilMinus />}
                    text='Description'
                    editRef={descriptionRef}
                    ticketDetail={ticketDetail.description}
                  />

                  <EditableText
                    detailIcon={<BiLink />}
                    text='Link'
                    editRef={linkRef}
                    ticketDetail={ticketDetail.link}
                  />
                  <Comments ticketId={ticketDetail._id} />
                </Box>

                <Box>
                  <SelectStatus />
                  <AssignUser text='Assignee' detailIcon={<RxPerson />} />

                  <SelectDate
                    dateRef={dateRef}
                    defaultValue={ticketDetail.dueDate}
                  />

                  <Box className='ticketDetailOpenModalBoxButton '>
                    <button
                      className='ticketDetailOpenModalButton button1'
                      disabled={false}
                      onClick={() => deleteTicket(ticketDetail?._id)}
                    >
                      Delete
                    </button>
                    <button
                      className='ticketDetailOpenModalButton button2'
                      style={{ backgroundColor: '#8048c8', color: 'white' }}
                      disabled={false}
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Modal>
    </div>
  )
}

export const TicketTab = ({ openModal, ticketDetail }) => {
  return (
    <div onClick={openModal} className='ticketDetailOpenModal'>
      <div>
        <h3>{ticketDetail.title}</h3>
      </div>
    </div>
  )
}
