import { Box } from '@mui/material'
import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketDialogState } from 'utils/redux/slices/taskBoardSlice'
import { DeleteTicketBtn, SaveTicketBtn, CreateTicketBtn } from './'

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
