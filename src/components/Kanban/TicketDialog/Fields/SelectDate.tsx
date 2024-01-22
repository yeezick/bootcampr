import { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { Icon } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { handleReduxDateChange } from 'utils/helpers/taskHelpers'

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
      <div className='date-icon-container'>
        <Icon>
          <AiOutlineCalendar />
        </Icon>
        <h1>Due date</h1>
      </div>
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
