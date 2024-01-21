import { FormControl, MenuItem, Select } from '@mui/material'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { handleReduxInputChange } from 'utils/helpers'
import { useEffect } from 'react'
import { TicketTextLabel } from './TicketTextFields'
import { red } from '@mui/material/colors'

export const SelectStatus = () => {
  const { status } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status) {
      dispatch(setTicketFields({ oldStatus: status }))
    } else {
      dispatch(setTicketFields({ status: 'toDo' }))
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
        sx={{ borderColor: 'red' }}
        name='status'
        onChange={handleStatusChange}
        variant='outlined'
        value={status}
      >
        <MenuItem value={'toDo'}>To Do</MenuItem>
        <MenuItem value={'inProgress'}>In progress</MenuItem>
        <MenuItem value={'underReview'}>Under Review</MenuItem>
        <MenuItem value={'completed'}>Completed </MenuItem>
      </Select>
    </div>
  )
}
