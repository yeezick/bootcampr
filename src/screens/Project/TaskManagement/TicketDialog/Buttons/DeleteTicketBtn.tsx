import { SecondaryButton } from 'components/Buttons'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectHasConflictedTicket } from 'utils/redux/slices/taskBoardSlice'
import { setConfirmationDialogType } from 'utils/redux/slices/taskBoardSlice'

export const DeleteTicketBtn = () => {
  const dispatch = useAppDispatch()
  const handleOpenDeleteDialog = () =>
    dispatch(setConfirmationDialogType('delete'))
  const hasConflictedTicket = useAppSelector(selectHasConflictedTicket)

  return (
    <SecondaryButton
      colorScheme='secondary'
      onClick={handleOpenDeleteDialog}
      label={'Delete story'}
      disabled={hasConflictedTicket}
    />
  )
}
