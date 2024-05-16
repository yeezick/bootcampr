import { SecondaryButton } from 'components/Buttons'
import { useAppDispatch } from 'utils/redux/hooks'
import { setConfirmationDialogType } from 'utils/redux/slices/taskBoardSlice'

export const DeleteTicketBtn = () => {
  const dispatch = useAppDispatch()
  const handleOpenDeleteDialog = () =>
    dispatch(setConfirmationDialogType('delete'))

  return (
    <SecondaryButton
      colorScheme='secondary'
      onClick={handleOpenDeleteDialog}
      label={'Delete story'}
    />
  )
}
