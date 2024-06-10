import { useEffect, useState } from 'react'
import { selectProjectTimeline } from 'utils/redux/slices/projectSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { DatePicker } from '@mui/x-date-pickers'
import { handleReduxDateChange } from 'utils/helpers/taskHelpers'
import { TicketTextLabel } from './TicketTextFields'
import { iconMap } from 'utils/components/Icons'
import { blankDayJs, generateDayJs } from 'utils/helpers'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'
dayjs.extend(isSameOrAfter)

export const SelectDate = () => {
  const [datePickerDayjs, setDayPickerDayjs] = useState(blankDayJs())
  const { startDate, endDate } = useAppSelector(selectProjectTimeline)
  const { dueDate } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!dueDate) {
      if (generateDayJs(startDate).isSameOrAfter(blankDayJs())) {
        setDayPickerDayjs(generateDayJs(startDate))
        handleReduxDateChange(dispatch, datePickerDayjs)
      } else {
        setDayPickerDayjs(blankDayJs())
        handleReduxDateChange(dispatch, datePickerDayjs)
      }
    } else {
      setDayPickerDayjs(generateDayJs(dueDate))
    }
  }, [dueDate])

  const handleDateChange = newDate => {
    setDayPickerDayjs(newDate)
    handleReduxDateChange(dispatch, newDate)
  }

  return (
    <div className='due-date'>
      <TicketTextLabel icon='calendar' label='Due date' />
      <DatePicker
        disablePast
        minDate={generateDayJs(startDate)}
        maxDate={generateDayJs(endDate)}
        className='select-date'
        format='MM/DD/YY'
        onChange={handleDateChange}
        slots={{ openPickerIcon: iconMap['calendar'] }}
        slotProps={{ popper: { placement: 'bottom-end' } }}
        value={datePickerDayjs}
      />
    </div>
  )
}
