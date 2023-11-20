import { Box } from '@mui/material'
import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketDialogState } from 'utils/redux/slices/taskBoardSlice'
import { DeleteTicketBtn } from './DeleteTicketBtn'
import { SaveTicketBtn } from './SaveTicketBtn'
import { CreateTicketBtn } from './CreateTicketBtn'

export const TicketDialogButtons = () => {
  const ticketDialogState = useAppSelector(selectTicketDialogState)

  return (
    <Box className='ticketDetailOpenModalBoxButton '>
      {ticketDialogState === 'edit' ? (
        <>
          <DeleteTicketBtn />
          <SaveTicketBtn />
        </>
      ) : (
        <CreateTicketBtn />
      )}
    </Box>
  )
}
