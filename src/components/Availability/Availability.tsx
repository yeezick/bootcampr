import { useState } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import {
  ExpandMoreRounded,
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import './Availability.scss'
import {
  defaultAvailability,
  Timezones,
  timeOptions,
  weekdays,
} from './utils/data'

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.ET)

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
          '& .MuiSvgIcon-root': { color: '#022888' },
        }}
        value={timezone}
        variant='standard'
        onChange={e => setTimezone(e.target.value)}
      >
        {Object.keys(Timezones).map(zone => (
          <MenuItem value={Timezones[zone]}>{Timezones[zone]}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

const DayAvailabilityInputBanner = ({ day }) => {
  const [days, setDays] = useState(defaultAvailability)

  const handleChange = e => {
    // consolidate availability function before storing
    setDays({
      ...days,
      [e.target.name]: {
        available: !days[e.target.name].available,
        availability: [...days[e.target.name].availability, ['test']],
      },
    })
  }

  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <Checkbox
            name={day}
            onChange={e => handleChange(e)}
            sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
          />
          <h2>{day}</h2>
          {days[day]['available'] ? (
            <TimeSlotInput day={day} />
          ) : (
            <h2>Unavailable</h2>
          )}
        </div>
        <div className='right-banner'>
          <AddRounded />
          <ContentCopyOutlined />
        </div>
      </div>
      <hr />
    </div>
  )
}

const TimeSlotInput = ({ day }) => {
  return (
    <div className='timeslot-input'>
      {/* Make a new custom component for these that takes in arguments like day, start/end, to keep this clean */}
      <Select
        name={`${day}-start`}
        onChange={e => console.log(e.target.name)}
        size='small'
        defaultValue='9:00 AM'
        inputProps={{ sx: { padding: '8px 13px !important' } }}
        sx={{
          padding: '0 !important',
          fontSize: '14px',
          '& .MuiSvgIcon-root': { display: 'none' },
          backgroundColor: '#fefefe',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {timeOptions.map(time => (
          <MenuItem value={time}>{time}</MenuItem>
        ))}
      </Select>
      <p>--</p>
      <Select
        name={`${day},end`}
        onChange={e => console.log(e.target.name)}
        size='small'
        defaultValue='5:00 PM'
        inputProps={{ sx: { padding: '8px 13px !important' } }}
        sx={{
          fontSize: '14px',
          '& .MuiSvgIcon-root': { display: 'none' },
          backgroundColor: '#fefefe',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {timeOptions.map(time => (
          <MenuItem value={time}>{time}</MenuItem>
        ))}
      </Select>
      <DeleteOutline className='icon' />
    </div>
  )
}
