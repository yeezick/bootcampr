import { useState } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import {
  ExpandMoreRounded,
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import './Availability.scss'
import { defaultAvailability, Timezones, timeOptions } from './utils/data'
import { weekdaysMap } from './utils/data'

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.ET)

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map(day => (
        <DayAvailabilityInputBanner day={day} />
      ))}
    </div>
  )
}

const TimeZoneInputBanner = ({ setTimezone, timezone }) => {
  return (
    <div className='timezone-input-container'>
      <h2>Time zone</h2>
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

  const handleCheck = e => {
    setDays({
      ...days,
      [e.target.name]: {
        available: !days[e.target.name].available,
        availability: [...days[e.target.name].availability],
      },
    })
  }

  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <div className='check-day'>
            <Checkbox
              name={day}
              onChange={e => handleCheck(e)}
              sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
              checked={days[day].available}
            />
            <h2>{day}</h2>
          </div>
          {days[day]['available'] ? (
            <TimeSlotInput
              day={day}
              days={days}
              setDays={setDays}
              slots={days[day].availability}
            />
          ) : (
            <h2>Unavailable</h2>
          )}
        </div>
      </div>
      <hr />
    </div>
  )
}

//
const subOptions = (startTime, isStart, idx) => {
  const index = idx === 0 ? 0 : timeOptions.indexOf(startTime)
  return isStart ? timeOptions.slice(index) : timeOptions.slice(index + 1)
}

const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const handleTimeChange = e => {
    const context = e.target.name.split('-')
    const day = context[0]
    const frame = Number(context[1])
    const index = context[2] === 'start' ? 0 : 1
    const oldAvailability = days[day].availability
    const newAvailability = oldAvailability
    newAvailability[frame][index] = e.target.value
    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: newAvailability,
      },
    })
  }

  return (
    <div className='timeslots-container'>
      {slots.map((slot, idx) => (
        <div className='timeslot-input'>
          {/* TODO: Make a new reusable component - takes in args like day, start/end, to keep this clean */}
          <div className='left-banner'>
            <Select
              name={`${day}-${idx}-start`}
              onChange={e => handleTimeChange(e)}
              size='small'
              defaultValue={slot[0]}
              value={days[day].availability[idx][0]}
              inputProps={{ sx: { padding: '8px 13px !important' } }}
              sx={{
                padding: '0 !important',
                fontSize: '14px',
                '& .MuiSvgIcon-root': { display: 'none' },
                backgroundColor: '#fefefe',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                width: '87px',
                fieldset: {
                  border: 'none !important',
                  outline: 'none !important',
                },
                elevation: '0',
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 160,
                    boxShadow: 0,
                    width: 130,
                    marginLeft: 2.5,
                    marginTop: 0.5,
                  },
                },
              }}
            >
              {subOptions(slot[0], true, idx).map(time => (
                <MenuItem value={time}>{time}</MenuItem>
              ))}
            </Select>
            <h4>--</h4>
            <Select
              name={`${day}-${idx}-end`}
              onChange={e => handleTimeChange(e)}
              size='small'
              defaultValue={days[day].availability[idx][1]}
              value={days[day].availability[idx][1]}
              inputProps={{ sx: { padding: '8px 13px !important' } }}
              sx={{
                fontSize: '14px',
                '& .MuiSvgIcon-root': { display: 'none' },
                backgroundColor: '#fefefe',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                width: '87px',
                fieldset: {
                  border: 'none !important',
                  outline: 'none !important',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                    boxShadow: 0,
                    width: 130,
                    marginLeft: 2.5,
                    marginTop: 0.5,
                  },
                },
              }}
            >
              {subOptions(slot[0], false, idx).map(time => (
                <MenuItem value={time}>{time}</MenuItem>
              ))}
            </Select>
            <DeleteOutline
              className='icon'
              onClick={() =>
                console.log(
                  `Delete placeholder for ${day}, timeslot ${idx + 1}`
                )
              }
            />
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <div>
                <AddRounded
                  onMouseEnter={() =>
                    console.log(
                      `Show Hover Message placeholder for ${day} timeslot ${
                        idx + 1
                      }: add timeslot`
                    )
                  }
                  onMouseOut={() =>
                    console.log(
                      `Hide Hover Message placeholder for ${day} timeslot ${
                        idx + 1
                      }`
                    )
                  }
                  onClick={e =>
                    console.log(`Add timeslot placeholder for ${day}`)
                  }
                />
              </div>
            )}
            {/* this has to move to a div bc the icon onMouse is weird */}
            <ContentCopyOutlined
              onMouseEnter={() =>
                console.log(
                  `Show Hover Message placeholder for ${day} timeslot ${
                    idx + 1
                  }: copy timeslot`
                )
              }
              onMouseOut={() =>
                console.log(
                  `Hide Hover Message placeholder for ${day} timeslot ${
                    idx + 1
                  }: copy timeslot`
                )
              }
              onClick={e =>
                console.log(
                  `Copy timeslot placeholder for ${day} timeslot: ${idx + 1}`
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}
