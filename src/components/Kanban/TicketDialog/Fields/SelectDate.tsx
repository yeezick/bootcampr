import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { handleReduxDateChange } from 'utils/helpers/taskHelpers'
import { TicketTextLabel } from './TicketTextFields'

dayjs.extend(utc)
dayjs.extend(timezone)

export const SelectDate = () => {
  const [datePickerDayjs, setDayPickerDayjs] = useState(dayjs())
  const { dueDate } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!dueDate) {
      setDayPickerDayjs(dayjs())
    } else {
      setDayPickerDayjs(dayjs(dueDate))
    }
  }, [])

  const handleDateChange = newDate => {
    setDayPickerDayjs(newDate)
    handleReduxDateChange(dispatch, newDate)
  }

  return (
    <div className='dateContainer'>
      <TicketTextLabel icon='calendar' label='Due date' />
      <div>
        <DatePicker
          disablePast
          format='MM/DD/YY'
          onChange={handleDateChange}
          value={datePickerDayjs}
        />
      </div>
    </div>
  )
}
