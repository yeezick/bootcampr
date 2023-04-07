import { useState } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import './Availability.scss'

enum Weekdays {
  sunday = 'SUN',
  monday = 'MON',
}
console.log(Weekdays.sunday)

enum Timezones {
  MST = 'Mountain Time - US & Canada',
}

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.MST)
  // STATE:
  // - each day:
  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      {weekdays.map(day => (
        <DayAvailabilityInputBanner day={day} />
      ))}
    </div>
  )
}

const TimeZoneInputBanner = ({ setTimezone, timezone }) => {
  return (
    <div className='timezone-input-container'>
      <h2>Time zone</h2>
      {/* TODO: define this select component elsewhere? */}
      <Select
        defaultValue={timezone}
        disableUnderline
        IconComponent={ExpandMoreRounded}
        sx={{
          color: '#022888',
          fontSize: '12px',
          '& .MuiSvgIcon-root': {
            color: '#022888',
          },
        }}
        value={timezone}
        variant='standard'
        onChange={e => setTimezone(e.target.value)}
      >
        <MenuItem value={Timezones.MST}>Mountain Time - US & Canada</MenuItem>
      </Select>
      <TimeZoneInput />
    </div>
  )
}

const TimeZoneInput = () => {
  return <div></div>
}

const DayAvailabilityInputBanner = ({ day }) => {
  return (
    <div>
      <div className='day-availability-input-banner'>
        <Checkbox
          sx={{
            color: '#022888',
            '&.Mui-checked': {
              color: '#022888',
            },
          }}
        />
        <h2>{day}</h2>
        {/* //checkbox // DAY // Unavailable OR... */}
        <TimeSlotInput />
        {/* // Add Timeslot Icon // Copy Availability Icon */}
      </div>
      <hr />
    </div>
  )
}

const TimeSlotInput = () => {
  return (
    <div>
      {/* // Start time input // - // End time input // Delete Icon */}
      <SingleHourDropdownInput />
      <SingleHourDropdownInput />
    </div>
  )
}

const SingleHourDropdownInput = () => {
  return <div>{/* // input // dropdown */}</div>
}
