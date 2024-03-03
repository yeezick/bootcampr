import { useAppSelector } from 'utils/redux/hooks'
import { selectVisibleTickets } from 'utils/redux/slices/taskBoardSlice'
import { TicketTab } from './TicketTab'
import { Droppable } from 'react-beautiful-dnd'

export const ColumnTickets = ({ columnStatus }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)

  return (
    <Droppable droppableId={columnStatus} key={`column-${columnStatus}`}>
      {provided => (
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
      )}
    </Droppable>
  )
}
