import { InputAdornment, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectTicketDialogState,
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'
import { fetchIcon, iconMap } from 'utils/components/Icons'
import { Comments } from '../Comments/Comments'

export const TicketTextFields = () => {
  const ticketDialogState = useAppSelector(selectTicketDialogState)
  const ticketFields = useAppSelector(selectTicketFields)

  return (
    <div className='ticket-text-fields'>
      <TicketTextField icon='title' label='Title' field='title' />
      <TicketTextField
        icon='description'
        label='Description'
        field='description'
        multiline
      />
      <TicketTextField icon='link' label='Link' field='link' />
      {ticketDialogState === 'edit' && <Comments ticketId={ticketFields._id} />}
    </div>
  )
}
export const TicketTextField = ({ field, label, icon, ...muiProps }) => {
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleInputChange = e =>
    handleReduxInputChange(e, dispatch, setTicketFields)

  return (
    <div>
      <TicketTextLabel icon={icon} label={label} />
      <TextField
        className='text-input'
        name={field}
        onChange={handleInputChange}
        value={ticketFields[field]}
        variant='outlined'
        {...muiProps}
      />
    </div>
  )
}

export const TicketTextLabel = ({ icon, label }) => {
  const LabelIcon = iconMap[icon]
  return (
    <div className='text-label'>
      <LabelIcon />
      <span>{label}</span>
    </div>
  )
}
