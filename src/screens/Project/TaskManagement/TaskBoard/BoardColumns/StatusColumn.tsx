import { CreateTicketTab } from '../CreateTicketTab'
import { ColumnTickets } from './ColumnTickets'
import { ColumnHeader } from './ColumnHeader'

export const StatusColumn = ({ columnStatus }) => {
  return (
    <div className='status-column'>
      <ColumnHeader columnStatus={columnStatus} />
      <CreateTicketTab columnStatus={columnStatus} />
      <ColumnTickets columnStatus={columnStatus} />
    </div>
  )
}
