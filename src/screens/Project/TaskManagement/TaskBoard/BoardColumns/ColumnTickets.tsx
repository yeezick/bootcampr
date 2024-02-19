import { useAppSelector } from 'utils/redux/hooks'
import { selectVisibleTickets } from 'utils/redux/slices/taskBoardSlice'
import { TicketTab } from './TicketTab'

export const ColumnTickets = ({ columnStatus, provided }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)

  return (
    <div
      className='tickets'
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {visibleTickets[columnStatus].map((ticketDetail, idx) => (
        <TicketTab
          key={ticketDetail._id}
          idx={idx}
          ticketDetail={ticketDetail}
        />
      ))}
      {provided.placeholder}
    </div>
  )
}
