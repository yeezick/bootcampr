import { AccessTime, ArrowDropDown } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import { updateDateInTimeSelections } from 'utils/helpers'
import { SelectTimeZone } from './SelectTimeZone'
import { SelectTime } from './SelectTime'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import '../styles/DisplayMeetingModal.scss'
import '../styles/Datefields.scss'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
dayjs.extend(utc)
dayjs.extend(timezone)

export const DateFields = ({ dateFields, dayjs, setDateFields }) => {
  const [datePickerDayjs, setDayPickerDayjs] = useState(dayjs())

  const handleDate = newDate => {
    const updatedDateFields = {
      ...dateFields,
      date: newDate.toISOString(),
      end: updateDateInTimeSelections(newDate, dateFields.end),
      start: updateDateInTimeSelections(newDate, dateFields.start),
    }
    setDateFields(updatedDateFields)
  }

  useEffect(() => {
    setDayPickerDayjs(dayjs(dateFields.date))
  }, [dateFields])

  return (
    <>
      <AccessTime className='clock-icon' />
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
          <div className='select-time-wrapper'>
            <SelectTime
              dateFields={dateFields}
              setDateFields={setDateFields}
              type={'start'}
            />
            <span className='span-dash'>&#8212;</span>
            <SelectTime
              dateFields={dateFields}
              setDateFields={setDateFields}
              type={'end'}
            />
          </div>
        </div>

        <SelectTimeZone
          dateFields={dateFields}
          setDateFields={setDateFields}
          eventTimezone={dateFields.eventTimezone}
        />
      </div>
    </>
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
