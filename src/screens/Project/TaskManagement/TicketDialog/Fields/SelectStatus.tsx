import { useEffect } from 'react'
import { MenuItem, Select } from '@mui/material'
import {
  selectTicketDialogState,
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { handleReduxInputChange } from 'utils/helpers'
import { TicketTextLabel } from './TicketTextFields'
import { selectProjectPresented } from 'utils/redux/slices/projectSlice'

export const SelectStatus = () => {
  const { status } = useAppSelector(selectTicketFields)
  const ticketDialogState = useAppSelector(selectTicketDialogState)
  const projectPresented = useAppSelector(selectProjectPresented)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ticketDialogState === 'edit') {
      dispatch(setTicketFields({ oldStatus: status }))
    }
  }, [])

  const handleStatusChange = e =>
    handleReduxInputChange(e, dispatch, setTicketFields)

  return (
    <div className='status'>
      <TicketTextLabel icon='localOffer' label='Status' />
      <Select
        className='select'
        inputProps={{ 'aria-label': 'Without label' }}
        name='status'
        onChange={handleStatusChange}
        value={status}
        disabled={projectPresented}
      >
        <MenuItem value={'toDo'}>To Do</MenuItem>
        <MenuItem value={'inProgress'}>In progress</MenuItem>
        <MenuItem value={'underReview'}>Under Review</MenuItem>
        <MenuItem value={'completed'}>Completed </MenuItem>
      </Select>
    </div>
  )
}
