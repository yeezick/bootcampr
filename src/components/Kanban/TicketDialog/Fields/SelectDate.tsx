import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { handleReduxDateChange } from 'utils/helpers/taskHelpers'
import { TicketTextLabel } from './TicketTextFields'
import { fetchIcon, iconMap } from 'utils/components/Icons'

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
    <div className='due-date'>
      <TicketTextLabel icon='calendar' label='Due date' />
      <DatePicker
        disablePast
        className='select-date'
        format='MM/DD/YY'
        onChange={handleDateChange}
        slots={{ openPickerIcon: iconMap['calendar'] }}
        value={datePickerDayjs}
      />
    </div>
  )
}
