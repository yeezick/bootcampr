import {
  Box,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { TicketInterface } from 'interfaces/TicketInterFace'
import { FiWatch } from 'react-icons/fi'
import '../Ticket.scss'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { splitCamelCaseToWords } from 'utils/helpers/stringHelpers'

export const SelectStatus = () => {
  const { status } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()
  const handleStatusChange = e =>
    dispatch(setTicketFields({ status: e.target.value }))

  return (
    <Box sx={{ minWidth: 10 }} className='selectStatus'>
      <div className='selectStatusIconText'>
        <Icon>
          <FiWatch />
        </Icon>
        <h3>Status</h3>
      </div>
      <FormControl className='selectStatusFormControl'>
        <Select
          className='selectStatusSelect'
          displayEmpty
          onChange={handleStatusChange}
          defaultValue={status}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'toDo'}>To Do</MenuItem>
          <MenuItem value={'inProgress'}>In progress</MenuItem>
          <MenuItem value={'underReview'}>Under Review</MenuItem>
          <MenuItem value={'completed'}>Completed </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
