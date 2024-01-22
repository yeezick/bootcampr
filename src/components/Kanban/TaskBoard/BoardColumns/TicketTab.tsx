import { Draggable } from '@hello-pangea/dnd'
import { TabDetails } from './TabDetails'

export const TicketTab = ({ idx, ticketDetail }) => {
  return (
    <Draggable
      key={ticketDetail._id}
      draggableId={ticketDetail._id}
      index={idx}
    >
      {provided => (
        <div
          className='ticketContainer'
          id={ticketDetail._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TabDetails ticketDetail={ticketDetail} />
        </div>
      )}
    </Draggable>
  )
}
