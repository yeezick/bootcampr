import { AccessTime, ArrowDropDown } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import { combineDateWithTime, updateDateInTimeSelections } from 'utils/helpers'
import { SelectTimeZone } from './SelectTimeZone'
import { SelectTime } from './SelectTime'
import './MeetingModalStyles.scss'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

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
          format='dddd, MM/DD/YY'
          onChange={handleDate}
          slots={{ openPickerIcon: ArrowDropDown }}
          slotProps={{
            textField: { size: 'small' },
            openPickerIcon: { sx: { position: 'absolute', right: '5px' } },
          }}
          sx={datePickerStyles}
          value={datePickerDayjs}
        />
        <span>from</span>
        <SelectTime
          dateFields={dateFields}
          dayjs={dayjs}
          setDateFields={setDateFields}
          type={'start'}
        />
        <span className='span-dash'>-</span>
        <SelectTime
          dateFields={dateFields}
          dayjs={dayjs}
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
  fontSize: '10px',
  background: '#ECEBEB',
  border: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}
