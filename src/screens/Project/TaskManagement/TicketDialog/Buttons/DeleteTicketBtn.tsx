import { SecondaryButton } from 'components/Buttons'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectConflictedTicket } from 'utils/redux/slices/taskBoardSlice'
import { setConfirmationDialogType } from 'utils/redux/slices/taskBoardSlice'

export const DeleteTicketBtn = () => {
  const dispatch = useAppDispatch()
  const handleOpenDeleteDialog = () =>
    dispatch(setConfirmationDialogType('delete'))
  const conflictedTicket = useAppSelector(selectConflictedTicket)

  return (
    <SecondaryButton
      colorScheme='secondary'
      onClick={handleOpenDeleteDialog}
      label={'Delete story'}
      disabled={Boolean(conflictedTicket.ticket)}
    />
  )
}
