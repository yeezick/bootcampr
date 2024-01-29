import { TicketDialogButtons } from '../Buttons'
import { SelectAssignee, SelectDate, SelectStatus, TicketCreator } from './'

export const TicketDropdownFields = () => {
  return (
    <div className='ticket-dropdown-fields'>
      <SelectStatus />
      <TicketCreator />
      <SelectAssignee />
      <SelectDate />
      <TicketDialogButtons />
    </div>
  )
}
