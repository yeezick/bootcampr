import '../../Ticket.scss'
import { Icon, Input } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'

// TODO: Redo with MUI
export const EditableText = ({ field, label, inputIcon }) => {
  const ticketFields = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleInputChange = e =>
    handleReduxInputChange(e, dispatch, setTicketFields)

  return (
    <div className='EditableText'>
      <div>
        <Icon>{inputIcon}</Icon>
      </div>
      <div className='EditableTextIconText'>
        <h4>{label}</h4>
      </div>
      <div className='blockquote-text'>
        <Input
          name={field}
          onChange={handleInputChange}
          value={ticketFields[field]}
        />
      </div>
    </div>
  )
}
