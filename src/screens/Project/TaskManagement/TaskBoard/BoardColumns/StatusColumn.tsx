import { CreateTicketTab } from '../CreateTicketTab'
import { ColumnTickets } from './ColumnTickets'
import { ColumnHeader } from './ColumnHeader'
import { Droppable } from 'react-beautiful-dnd'

export const StatusColumn = ({ columnStatus }) => {
  return (
    <Droppable droppableId={columnStatus}>
      {provided => (
        <div className='status-column'>
          <ColumnHeader columnStatus={columnStatus} />
          <CreateTicketTab columnStatus={columnStatus} />
          <ColumnTickets columnStatus={columnStatus} provided={provided} />
        </div>
      )}
    </Droppable>
  )
}
