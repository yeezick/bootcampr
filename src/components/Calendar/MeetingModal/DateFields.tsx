import {
  AccessTime,
  ArrowDropDown,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import './MeetingModalStyles.scss'
import { SelectTimeInput } from 'components/Availability/subcomponents/SelectTimeInput'

export const DateFields = ({ dateFields, setDateFields }) => {
  const handleDate = newDate => setDateFields({ ...dateFields, date: newDate })
  const handleFrom = newDate => setDateFields({ ...dateFields, start: newDate })
  const handleTo = newDate => setDateFields({ ...dateFields, end: newDate })
  const handleTimeZone = e =>
    setDateFields({ ...dateFields, timeZone: e.target.value })

  return (
    <div className='fields-wrapper'>
      <div className='time-fields'>
        <AccessTime />
        <DatePicker
          disablePast
          dayOfWeekFormatter={day => day.charAt(0).toUpperCase()}
          onChange={handleDate}
          label='date picker'
          slots={{ openPickerIcon: ArrowDropDown }}
          sx={{ fontSize: '10px' }}
          value={dateFields.date}
        />
        <span>from</span>
        <TimePicker
          disablePast
          label='time picker'
          onChange={handleFrom}
          slots={{ openPickerIcon: ArrowDropDown }}
          value={dateFields.start}
        />
        <span>-</span>
        <TimePicker
          disablePast
          label='time picker'
          onChange={handleTo}
          slots={{ openPickerIcon: ArrowDropDown }}
          value={dateFields.end}
        />
      </div>

      <div className='timezone-wrapper'>
        <p>TimeZone </p>
        <FormControl
          aria-label='timezone'
          hiddenLabel={true}
          sx={{
            alignSelf: 'center',
            fontSize: '14px',
          }}
        >
          <Select
            defaultValue={dateFields.timeZone}
            disableUnderline={true}
            IconComponent={CustomArrowDown}
            onChange={handleTimeZone}
            sx={{
              color: '#022888',
              fontSize: '14px',
            }}
            variant='standard'
          >
            {usTimeZones.map(timeZone => (
              <MenuItem value={timeZone.value} key={timeZone.value}>
                {timeZone.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

const CustomArrowDown = () => <KeyboardArrowDown sx={{ color: '#022888' }} />

const usTimeZones = [
  { value: 'America/Puerto_Rico', name: 'Puerto Rico (Atlantic)' },
  { value: 'America/New_York', name: 'New York (Eastern)' },
  { value: 'America/Chicago', name: 'Chicago (Central)' },
  { value: 'America/Denver', name: 'Denver (Mountain)' },
  { value: 'America/Phoenix', name: 'Phoenix (MST)' },
  { value: 'America/Los_Angeles', name: 'Los Angeles (Pacific)' },
  { value: 'America/Anchorage', name: 'Anchorage (Alaska)' },
  { value: 'Pacific/Honolulu', name: 'Honolulu (Hawaii)' },
]
