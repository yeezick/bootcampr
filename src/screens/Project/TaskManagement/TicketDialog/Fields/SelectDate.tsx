import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { DatePicker } from '@mui/x-date-pickers'
import { handleReduxDateChange } from 'utils/helpers/taskHelpers'
import { TicketTextLabel } from './TicketTextFields'
import { iconMap } from 'utils/components/Icons'
import { blankDayJs, generateDayJs } from 'utils/helpers'

export const SelectDate = () => {
  const [datePickerDayjs, setDayPickerDayjs] = useState(blankDayJs())
  const { dueDate } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!dueDate) {
      setDayPickerDayjs(blankDayJs())
      handleReduxDateChange(dispatch, datePickerDayjs)
    } else {
      setDayPickerDayjs(generateDayJs(dueDate))
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
