import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketDialogState } from 'utils/redux/slices/taskBoardSlice'
import {
  DeleteTicketBtn,
  SaveTicketBtn,
  CreateTicketBtn,
  CancelTicketBtn,
} from '.'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const TicketDialogButtons = () => {
  const ticketDialogState = useAppSelector(selectTicketDialogState)

  return (
    <ButtonContainer gap={32}>
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
    </ButtonContainer>
  )
}
