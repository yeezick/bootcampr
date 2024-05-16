import { Dialog, DialogContent } from '@mui/material'
import { PrimaryButton, TextButton } from 'components/Buttons'
import {
  closeConfirmationDialog,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectConfirmationDialogType } from 'utils/redux/slices/taskBoardSlice'
import '../../styles/ConfirmationDialogs.scss'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const CancelDialog = () => {
  const confirmationDialogType = useAppSelector(selectConfirmationDialogType)
  const dispatch = useAppDispatch()
  const handleCloseVisibleTicketDialog = () =>
    closeVisibleTicketDialog(dispatch)
  const handleCloseDialog = () => closeConfirmationDialog(dispatch)
  const openDialog = confirmationDialogType === 'cancel'

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='xs'>
      <DialogContent className='confirmation-dialog'>
        <h3>Close this story?</h3>
        <p>Any information you input or changes you made will not be saved.</p>
        <ButtonContainer>
          <TextButton onClick={handleCloseDialog} label='Cancel' />
          <PrimaryButton
            onClick={handleCloseVisibleTicketDialog}
            label='Close'
          />
        </ButtonContainer>
      </DialogContent>
    </Dialog>
  )
}
