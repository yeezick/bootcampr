import { ArrowDropDown } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import { updateDateInTimeSelections } from 'utils/helpers'
import { SelectTimeZone } from './SelectTimeZone'
import { SelectTime } from './SelectTime'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import './MeetingModalStyles.scss'

dayjs.extend(utc)
dayjs.extend(timezone)

export const DateFields = ({ dateFields, dayjs, setDateFields }) => {
  const [datePickerDayjs, setDayPickerDayjs] = useState(dayjs())

  const handleDate = newDate =>
    setDateFields({
      ...dateFields,
      date: newDate.toISOString(),
      end: updateDateInTimeSelections(newDate, dateFields.end),
      start: updateDateInTimeSelections(newDate, dateFields.start),
    })

  useEffect(() => {
    setDayPickerDayjs(dayjs(dateFields.date))
  }, [])

  return (
    <div className='fields-wrapper'>
      <div className='time-fields'>
        <DatePicker
          disablePast
          format='MM/DD/YY'
          onChange={handleDate}
          slotProps={{
            textField: { size: 'small' },
            openPickerIcon: { sx: { position: 'absolute', right: '5px' } },
          }}
          sx={datePickerStyles}
          value={datePickerDayjs}
        />
        <SelectTime
          dateFields={dateFields}
          setDateFields={setDateFields}
          type={'start'}
        />
        <span>-</span>
        <SelectTime
          dateFields={dateFields}
          setDateFields={setDateFields}
          type={'end'}
        />
      </div>

      <SelectTimeZone
        dateFields={dateFields}
        setDateFields={setDateFields}
        timeZone={dateFields.timeZone}
      />
    </div>
  )
}

const datePickerStyles = {
  fontSize: '14px',
  border: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1.5px solid black',
  },
  marginRight: '20px',
  width: '180px',
}
