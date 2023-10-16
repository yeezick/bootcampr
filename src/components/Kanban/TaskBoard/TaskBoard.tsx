import { useState } from 'react'
import '../Ticket.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProject } from 'utils/redux/slices/projectSlice'
import { BoardColumns } from './BoardColumns'
import { NoTicketsCreated } from './NoTicketsCreated'
import { BoardHeader } from './BoardHeader'

// TODO: Rename projectTracker to project
export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProject)
  const [getAllTicket, setGetAllTicket] = useState(
    projectTracker?.projectTracker
  )

  const checkIfTheresNoTicket = () => {
    console.log(getAllTicket)
    const noTicket = Object.keys(getAllTicket).every(
      ticketStatus => getAllTicket[ticketStatus]?.length === 0
    )
    return noTicket
  }

  return (
    <div className='AllTickets'>
      <BoardHeader
        getAllTicket={getAllTicket}
        setGetAllTicket={setGetAllTicket}
        projectTracker={projectTracker}
      />
      <div
        className={`${
          checkIfTheresNoTicket()
            ? 'AllTicketsDragDropNoTicket'
            : 'AllTicketsDragDrop'
        }`}
      >
        <BoardColumns
          getAllTicket={getAllTicket}
          setGetAllTicket={setGetAllTicket}
        />
      </div>
      {checkIfTheresNoTicket() && (
        <NoTicketsCreated
          getAllTicket={getAllTicket}
          setGetAllTicket={setGetAllTicket}
          projectTracker={projectTracker}
        />
      )}
    </div>
  )
}
