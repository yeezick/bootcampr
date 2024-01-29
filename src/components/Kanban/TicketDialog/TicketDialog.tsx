import { Dialog, DialogContent } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  SelectAssignee,
  SelectDate,
  SelectStatus,
  TicketTextFields,
  TicketTextLabel,
} from './Fields'
import {
  selectConfirmationDialogType,
  selectTicketDialogState,
  selectTicketFields,
  selectVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import {
  closeCancelDialog,
  closeVisibleTicketDialog,
} from 'utils/helpers/taskHelpers'
import { TicketDialogButtons } from './Buttons'
import { Comments } from './Comments/Comments'
import './TicketDialog.scss'
import '../styles/ConfirmationDialogs.scss'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import { selectMembersById } from 'utils/redux/slices/projectSlice'
import { useEffect, useState } from 'react'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'

export const TicketDialog = () => {
  const { _id: ticketId } = useAppSelector(selectTicketFields)
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const ticketDialogState = useAppSelector(selectTicketDialogState)
  const dispatch = useAppDispatch()
  const handleCloseDialog = () => closeVisibleTicketDialog(dispatch)

  return (
    <>
      <Dialog
        maxWidth='lg'
        open={visibleTicketDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent className='ticket-dialog'>
          <div className='ticket-fields'>
            <TicketTextFields />
            <TicketDropdownFields />
          </div>
          {!ticketDialogState && <Comments ticketId={ticketId} />}
        </DialogContent>
      </Dialog>
      <CancelDialog />
    </>
  )
}

const CancelDialog = () => {
  const confirmationDialogType = useAppSelector(selectConfirmationDialogType)
  const dispatch = useAppDispatch()
  const handleCloseVisibleTicketDialog = () =>
    closeVisibleTicketDialog(dispatch)
  const handleCloseCancelDialog = () => closeCancelDialog(dispatch)

  return (
    <Dialog
      open={confirmationDialogType === 'cancel'}
      onClose={handleCloseCancelDialog}
      maxWidth='xs'
    >
      <DialogContent className='confirmation-dialog'>
        <h3>Close this ticket?</h3>
        <p>Any information you input or changes you made will not be saved.</p>
        <div className='buttons'>
          <SecondaryButton
            handler={handleCloseCancelDialog}
            text='Cancel'
            variant='text'
          />
          <PrimaryButton
            disableElevation
            handler={handleCloseVisibleTicketDialog}
            text='Close'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// TODO: Work on combining styles between this and ticket text
const TicketDropdownFields = () => {
  return (
    <div className='ticket-dropdown-fields'>
      <SelectStatus />
      <TicketCreator />
      <SelectAssignee />
      <SelectDate />
      <TicketDialogButtons />
    </div>
  )
}

const TicketCreator = () => {
  const { createdBy } = useAppSelector(selectTicketFields)
  const [user] = useAppSelector(selectMembersById([createdBy]))
  const [creator, setCreator] = useState({
    userId: 'Unassigned',
    firstName: '',
    lastName: '',
    role: '',
  })
  const { firstName, lastName, role, userId } = creator

  useEffect(() => {
    if (user) {
      const { firstName, lastName, role, _id: userId } = user
      setCreator({ firstName, lastName, role, userId })
    }
  }, [])

  return (
    <div>
      <TicketTextLabel icon='person' label='Created by' />
      <div className='ticket-creator'>
        <TeamAvatar userId={userId} size='small' />
        <div className='creator-info'>
          <p className='name'>{`${firstName} ${lastName}`}</p>
          <p className='role'>{role}</p>
        </div>
      </div>
    </div>
  )
}
