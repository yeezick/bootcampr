import { Droppable } from '@hello-pangea/dnd'
import { CreateTicketTab } from '../CreateTicketTab'
import { ColumnTickets } from './ColumnTickets'
import { ColumnHeader } from './ColumnHeader'

export const StatusColumn = ({ columnStatus }) => {
  return (
    <Droppable droppableId={columnStatus} key={`column-${columnStatus}`}>
      {provided => (
        <div className='ticketStatusContainer'>
          <ColumnHeader columnStatus={columnStatus} />
          <CreateTicketTab columnStatus={columnStatus} />
          <ColumnTickets provided={provided} columnStatus={columnStatus} />
        </div>
      )}
    </Droppable>
  )
}
