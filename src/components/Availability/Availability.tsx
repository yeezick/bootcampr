import { useState } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import './Availability.scss'

// enum Weekdays {
//   sunday = 'SUN',
//   monday = 'MON',
// }

enum Timezones {
  MST = 'Mountain Time - US & Canada',
}

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.MST)
  // const [sundayAvailability, setSundayAvailability] = useState(false)
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
  const [days, setDays] = useState({
    ['SUN']: false,
    ['MON']: false,
    ['TUE']: false,
    ['WED']: false,
    ['THU']: false,
    ['FRI']: false,
    ['SAT']: false,
  })

  const handleChange = e => {
    console.log(e.target.name)
    console.log(days)
    setDays({
      ...days,
      [e.target.name]: !days[e.target.name],
    })
  }

  return (
    <div>
      <div className='day-availability-input-banner'>
        <Checkbox
          name={day}
          onChange={e => handleChange(e)}
          sx={{
            color: '#022888',
            '&.Mui-checked': {
              color: '#022888',
            },
          }}
        />
        <h2>{day}</h2>
        {days[day] ? <TimeSlotInput /> : <h2>Unavailable</h2>}

        {/* // Add Timeslot Icon // Copy Availability Icon */}
      </div>
      <hr />
    </div>
  )
}

const TimeSlotInput = () => {
  return (
    <div className='timeslot-input'>
      <Select
        size='small'
        defaultValue='9:00 AM'
        inputProps={{ sx: { padding: '10px 15px !important' } }}
        sx={{
          padding: '0 !important',
          fontSize: '14px',
          '& .MuiSvgIcon-root': { display: 'none' },
          backgroundColor: '#fefefe',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        <MenuItem value={'9:00 AM'}>9:00 AM</MenuItem>
        <MenuItem value={'9:30 AM'}>9:30 AM</MenuItem>
      </Select>
      <p>--</p>
      <Select
        size='small'
        defaultValue='5:00 PM'
        inputProps={{ sx: { padding: '10px 15px !important' } }}
        sx={{
          fontSize: '14px',
          '& .MuiSvgIcon-root': { display: 'none' },
          backgroundColor: '#fefefe',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        <MenuItem value={'9:00 AM'}>9:00 AM</MenuItem>
        <MenuItem value={'9:30 AM'}>9:30 AM</MenuItem>
        <MenuItem value={'5:00 PM'}>5:00 PM</MenuItem>
      </Select>
      <SingleHourDropdownInput />
      <SingleHourDropdownInput />
      {/* trash icon */}
    </div>
  )
}

const SingleHourDropdownInput = () => {
  return <div>{/* // input // dropdown */}</div>
}
