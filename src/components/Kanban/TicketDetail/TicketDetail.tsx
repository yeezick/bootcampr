import { useState, useRef, MutableRefObject } from 'react'
import Modal from '@mui/material/Modal'
import { Button, Box } from '@mui/material'
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
import '../Ticket.scss'
import EditableText from './EditableText'
import { FaBeer } from 'react-icons/fa'
import { MdOutlineTitle } from 'react-icons/md'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
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
      <div onClick={openModal} className='ticketDetail-openModal'>
        <div>
          <h3>{ticketDetail.title}</h3>
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={closeModal} className='modal'>
        {isBeingEdited ? (
          <h1>Saving changes...</h1>
        ) : (
          <>
            <Box>
              <Box className='ticketDetail-openModal-box'>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: '50%' }}>
                    <EditableText
                      detailIcon={<MdOutlineTitle />}
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

                  <Box sx={{ width: '50%' }}>
                    <SelectStatus
                      handleOnChange={handleEditChange}
                      ticketDetail={ticketDetail}
                      splitCamelCaseToWords={splitCamelCaseToWords}
                    />
                    <input
                      type='date'
                      name='date'
                      ref={dateRef}
                      defaultValue={ticketDetail.dueDate}
                    />
                  </Box>
                </Box>

                <Box>
                  <Button
                    sx={{ marginRight: '10px' }}
                    color='error'
                    disabled={false}
                    size='small'
                    variant='outlined'
                    onClick={() => deleteTicket(ticketDetail?._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    sx={{ marginRight: '10px' }}
                    color='success'
                    disabled={false}
                    size='small'
                    variant='outlined'
                    onClick={() => saveChanges()}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Modal>
    </div>
  )
}
