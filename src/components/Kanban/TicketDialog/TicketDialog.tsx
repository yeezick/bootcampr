import { Box, Modal } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { RxPerson } from 'react-icons/rx'
import {
  SelectAssignee,
  SelectDate,
  SelectStatus,
  TicketInputFields,
} from './Fields'
import '../Ticket.scss'
import {
  selectTicketFields,
  selectVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { handleCloseVisibleTicketDialog } from 'utils/helpers/taskHelpers'
import { TicketDialogButtons } from './Buttons'
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
            <SelectAssignee detailIcon={<RxPerson />} />
            <SelectDate />
            <TicketDialogButtons />
          </Box>
          <Comments ticketId={ticketId} />
        </Box>
      </Box>
    </Modal>
  )
}
