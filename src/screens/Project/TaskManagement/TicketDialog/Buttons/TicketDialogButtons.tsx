import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketDialogState } from 'utils/redux/slices/taskBoardSlice'
import {
  DeleteTicketBtn,
  SaveTicketBtn,
  CreateTicketBtn,
  CancelTicketBtn,
} from '.'

export const TicketDialogButtons = () => {
  const ticketDialogState = useAppSelector(selectTicketDialogState)

  return (
    <div className='buttons'>
      {ticketDialogState === 'edit' ? (
        <>
          <DeleteTicketBtn />
          <SaveTicketBtn />
        </>
      ) : (
        <>
          <CancelTicketBtn />
          <CreateTicketBtn />
        </>
      )}
    </div>
  )
}
