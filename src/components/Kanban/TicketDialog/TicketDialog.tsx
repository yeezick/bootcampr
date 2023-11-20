import { Box, Modal } from '@mui/material'
import { SelectStatus } from 'components/Kanban'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { RxPerson } from 'react-icons/rx'
import { SelectDate, SelectUser } from './'
import '../Ticket.scss'
import { selectVisibleTicketDialog } from 'utils/redux/slices/taskBoardSlice'
import { handleCloseVisibleTicketDialog } from 'utils/helpers/taskHelpers'
import { TicketDialogButtons } from './Buttons'
import { TicketDetailInputsAndComments } from './Fields/TicketFieldsAndComments'

export const TicketDialog = () => {
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => handleCloseVisibleTicketDialog(dispatch)

  return (
    <Modal
      open={visibleTicketDialog}
      onClose={handleCloseDialog}
      className='modal'
    >
      <Box className='ticketDetailOpenModalBox'>
        <Box sx={{ display: 'flex' }}>
          <TicketDetailInputsAndComments />
          <Box>
            <SelectStatus />
            <SelectUser detailIcon={<RxPerson />} />
            <SelectDate />
            <TicketDialogButtons />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
