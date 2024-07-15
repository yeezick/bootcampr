import { Dialog, DialogContent } from '@mui/material'
import { deleteTicketApi } from 'utils/api/tickets'
import {
  closeConfirmationDialog,
  closeVisibleTicketDialog,
  isSandboxId,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { deleteTicket, selectProjectId } from 'utils/redux/slices/projectSlice'
import {
  selectConfirmationDialogType,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import '../../styles/ConfirmationDialogs.scss'
import { successSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { useState } from 'react'
import { deleteTicketEvent } from 'utils/redux/actions/socketActions'

export const DeleteTicketDialog = () => {
  const confirmationDialogType = useAppSelector(selectConfirmationDialogType)
  const projectId = useAppSelector(selectProjectId)
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => closeConfirmationDialog(dispatch)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteTicket = async () => {
    setIsLoading(true)
    const { status, _id: ticketId } = ticketFields
    const ticketInfo = {
      ticketId,
      ticketStatus: status,
      projectId,
    }
    const deleteTicketAction = isSandboxId(ticketId)
      ? deleteTicket({ status, ticketId })
      : deleteTicketEvent({ deletedTicketInfo: ticketInfo, projectId })

    // BC-412: add guard clause for tickets that failed to delete & display error toast
    if (!isSandboxId(ticketId)) {
      await deleteTicketApi(ticketInfo)
    }

    dispatch(deleteTicketAction)
    dispatch(successSnackbar('Story deleted successfully'))
    closeVisibleTicketDialog(dispatch)
    setIsLoading(false)
  }

  return (
    <Dialog
      open={confirmationDialogType === 'delete'}
      onClose={handleCloseDialog}
      maxWidth='xs'
    >
      <DialogContent className='confirmation-dialog'>
        <h3>Delete story?</h3>
        <p>
          All the information, including comments, will be lost and gone
          forever.
        </p>
        <ButtonContainer>
          <TextButton onClick={handleCloseDialog} label='Cancel' />
          <PrimaryButton
            loading={isLoading}
            colorScheme='secondary'
            onClick={handleDeleteTicket}
            label='Delete'
          />
        </ButtonContainer>
      </DialogContent>
    </Dialog>
  )
}
