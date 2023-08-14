import { AccessTime, ArrowDropDown } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import { combineDateWithTime } from 'utils/helpers'
import { SelectTimeZone } from './SelectTimeZone'
import { SelectTime } from './SelectTime'
import './MeetingModalStyles.scss'

export const DateFields = ({ dateFields, dayjs, setDateFields }) => {
  const handleDate = newDate =>
    setDateFields({
      ...dateFields,
      date: newDate,
      end: combineDateWithTime(newDate, dateFields.end.format('hh:mm A')),
      start: combineDateWithTime(newDate, dateFields.start.format('hh:mm A')),
    })

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
          value={dateFields.date}
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
