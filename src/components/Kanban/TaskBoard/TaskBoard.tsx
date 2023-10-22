import { useEffect, useState } from 'react'
import '../Ticket.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { BoardColumns } from './BoardColumns'
import { NoTicketsCreated } from './NoTicketsCreated'
import { BoardHeader } from './BoardHeader'
import { Box, Dialog, DialogContent } from '@mui/material'
import { IoMdClose } from 'react-icons/io'
import {
  StatusFields,
  TextFields,
  TicketStatusFields,
  TicketTextFields,
} from '../CreateTickets/CreateTicket'
import { TaskInterface } from 'interfaces'

type TicketModalStates = '' | 'create' | 'edit'

// TODO: Rename projectTracker to project
export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const [visibleTickets, setVisibleTickets] = useState(projectTracker)
  const [ticketsExist, setTicketsExist] = useState(false)
  const [visibleTicketModal, setVisibleTicketModal] = useState<boolean>(false)

  useEffect(() => {
    const doTicketsExist = () => {
      if (visibleTickets) {
        const noTicket = Object.keys(visibleTickets).some(
          status => visibleTickets[status]?.length > 0
        )
        return noTicket
      } else return false
    }
    setTicketsExist(doTicketsExist())
  }, [projectTracker])

  return (
    <div className='AllTickets'>
      <BoardHeader
        visibleTickets={visibleTickets}
        setVisibleTickets={setVisibleTickets}
      />
      {ticketsExist && (
        <BoardColumns
          getAllTicket={visibleTickets}
          setGetAllTicket={setVisibleTickets}
        />
      )}
      {!ticketsExist && (
        <NoTicketsCreated
          getAllTicket={visibleTickets}
          setGetAllTicket={setVisibleTickets}
        />
      )}
    </div>
  )
}

const emptyTicketFields: TaskInterface = {
  assignee: '',
  date: '',
  description: '',
  _id: '',
  id: '',
  link: '',
  projectId: '',
  status: '',
  title: '',
}

export const TicketDialog = ({
  visibleTicketModal,
  setVisibleTicketModal,
  visibleTickets,
  setVisibleTickets,
}) => {
  const [ticketFields, setTicketFields] =
    useState<TaskInterface>(emptyTicketFields)
  const [ticketModalState, setTicketModalState] =
    useState<TicketModalStates>('')
  const openModal = () => setVisibleTicketModal(false)
  const closeModal = () => setVisibleTicketModal(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTicketFields({
      ...ticketFields,
      [e.target.name]: e.target.value,
    })
  }

  const ticketsStatus = ''
  return (
    <Dialog open={visibleTicketModal} onClose={closeModal}>
      <form>
        <DialogContent>
          <Box className='ticketDetailOpenModalBox'>
            <IoMdClose className='close-x' onClick={closeModal} />
            <Box className='createTicketBox'>
              <TicketTextFields handleInputChange={handleInputChange} />
              <TicketStatusFields
                ticketsStatus={ticketsStatus}
                handleInputChange={handleInputChange}
                closeModal={closeModal}
                addTicketForm={ticketFields}
                getAllTicket={visibleTickets}
                setGetAllTicket={setVisibleTickets}
              />
            </Box>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  )
}
