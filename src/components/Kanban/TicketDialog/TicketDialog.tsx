import { Box, Modal } from '@mui/material'
import { SelectStatus } from 'components/Kanban'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { RxPerson } from 'react-icons/rx'
import { SelectDate, SelectUser } from './'
import '../Ticket.scss'
import {
  selectTicketFields,
  selectVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { handleCloseVisibleTicketDialog } from 'utils/helpers/taskHelpers'
import { TicketDialogButtons } from './Buttons'
import { TicketInputFields } from './Fields/TicketInputFields'
import { Comments } from './Comments/Comments'

export const TicketDialog = () => {
  const { _id: ticketId } = useAppSelector(selectTicketFields)
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
          <TicketInputFields />
          <Box>
            <SelectStatus />
            <SelectUser detailIcon={<RxPerson />} />
            <SelectDate />
            <TicketDialogButtons />
          </Box>
          <Comments ticketId={ticketId} />
        </Box>
      </Box>
    </Modal>
  )
}
