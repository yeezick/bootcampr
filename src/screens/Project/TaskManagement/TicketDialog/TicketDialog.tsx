import { Dialog, DialogContent } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { TicketDropdownFields, TicketTextFields } from './Fields'
import {
  selectTicketFields,
  selectVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { toggleCancelDialog } from 'utils/helpers/taskHelpers'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import { fetchIcon } from 'utils/components/Icons'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { CancelDialog, DeleteTicketDialog } from './Dialogs'
import '../styles/TicketDialog.scss'

export const TicketDialog = () => {
  const projectId = useAppSelector(selectProjectId)
  const ticketFields = useAppSelector(selectTicketFields)
  const userId = useAppSelector(selectUserId)
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () =>
    toggleCancelDialog(dispatch, userId, projectId, ticketFields)

  return (
    <>
      <Dialog
        maxWidth='lg'
        open={visibleTicketDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent className='ticket-dialog'>
          {fetchIcon('close', {
            className: 'close-dialog',
            onClick: handleCloseDialog,
          })}
          <div className='ticket-fields'>
            <TicketTextFields />
            <TicketDropdownFields />
          </div>
        </DialogContent>
      </Dialog>
      <CancelDialog />
      <DeleteTicketDialog />
    </>
  )
}
