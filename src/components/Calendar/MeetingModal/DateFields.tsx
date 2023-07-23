import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'

export const DateFields = ({ dateFields, setDateFields }) => {
  const handleDate = newDate => setDateFields({ ...dateFields, date: newDate })
  const handleFrom = newDate => setDateFields({ ...dateFields, start: newDate })
  const handleTo = newDate => setDateFields({ ...dateFields, end: newDate })
  const handleTimeZone = newTimeZone =>
    setDateFields({ ...dateFields, timeZone: newTimeZone })
  return (
    <div>
      <DatePicker
        value={dateFields.date}
        label='date picker'
        onChange={handleDate}
      />
      <TimePicker
        value={dateFields.start}
        label='time picker'
        onChange={handleFrom}
      />
      <span>-</span>
      <TimePicker
        value={dateFields.end}
        label='time picker'
        onChange={handleTo}
      />
      <FormControl>
        <InputLabel>TimeZone</InputLabel>
        <Select onChange={handleTimeZone}>
          {usTimeZones.map(timeZone => (
            <MenuItem key={timeZone.value}>{timeZone.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

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
