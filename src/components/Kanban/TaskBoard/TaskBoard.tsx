import { useEffect, useState } from 'react'
import '../Ticket.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { BoardColumns } from './BoardColumns'
import { NoTicketsCreated } from './NoTicketsCreated'
import { BoardHeader } from './BoardHeader'

// TODO: Rename projectTracker to project
export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const [visibleTickets, setVisibleTickets] = useState(projectTracker)
  const [ticketsExist, setTicketsExist] = useState(false)

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
