import { useState, useRef, MutableRefObject } from 'react'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
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
import { MdOutlineTitle } from 'react-icons/md'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import { RxPerson, RxText } from 'react-icons/rx'
import { UserAssignee } from './UserAssignee'
import { SelectDate } from './SelectDate'
import '../Ticket.scss'
import { SelectAssignee } from '../CreateTickets/SelectAssignee'

export const TicketDetail = ({
  ticketDetail,
  getAllTicket,

  setGetAllTicket,
  ticketsStatus,
  splitCamelCaseToWords,
  concatenatedString,
}: TicketDetailPropsInterface) => {
  const authUser = useAppSelector(selectAuthUser)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<string>()
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false)

  const tittleRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)
  const dateRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const linkRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)
  const descriptionRef: MutableRefObject<HTMLParagraphElement | null> =
    useRef(null)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const saveChanges = () => {
    const { status } = ticketDetail
    const updateText: TaskInterface = {
      assignees: authUser._id,
      date: dateRef.current?.value,
      description: descriptionRef.current?.textContent,
      _id: ticketDetail._id,
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

    closeModal()
  }
  return (
    <div>
      <div onClick={openModal} className='ticketDetailOpenModal'>
        <div>
          <h3>{ticketDetail.title}</h3>
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={closeModal} className='modal'>
        {isBeingEdited ? (
          <h1>Saving changes...</h1>
        ) : (
          <>
            <Box className='ticketDetailOpenModalBox'>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
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
                </Box>

                <Box>
                  {/* <SelectStatus
                    handleOnChange={handleEditChange}
                    ticketDetail={ticketDetail}
                    splitCamelCaseToWords={splitCamelCaseToWords}
                  /> */}
                  {/* 
                  <UserAssignee
                    text='Created by'
                    detailIcon={<RxPerson />}
                    userName={ticketDetail?.createdBy?.firstName}
                    userRole={ticketDetail?.createdBy?.role}
                    userImage={ticketDetail?.createdBy?.profilePicture}
                  /> */}

                  {/* <SelectAssignee
                    ticketDetail='testing'
                    setAssignees={() => console.log('what')}
                  /> */}
                  {/* <UserAssignee
                    text='Assignee'
                    detailIcon={<RxPerson />}
                    userName={ticketDetail?.assignees?.firstName}
                    userRole={ticketDetail?.assignees?.role}
                    userImage={ticketDetail?.assignees?.profilePicture}
                  /> */}

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
                      onClick={() => saveChanges()}
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
