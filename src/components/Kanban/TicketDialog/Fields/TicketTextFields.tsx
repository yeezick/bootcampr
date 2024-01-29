import { TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'
import { iconMap } from 'utils/components/Icons'

export const TicketTextFields = () => {
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
