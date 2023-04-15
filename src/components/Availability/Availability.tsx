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
// import { HoverMessage } from './utils/components/HoverMessage'
import { CopyTimesModal } from './utils/components/CopyTimesModal'

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.ET)

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      <DayAvailabilityInputBanner day='SUN' />
      <DayAvailabilityInputBanner day='MON' />
      <DayAvailabilityInputBanner day='TUE' />
      <DayAvailabilityInputBanner day='WED' />
      <DayAvailabilityInputBanner day='THU' />
      <DayAvailabilityInputBanner day='FRI' />
      <DayAvailabilityInputBanner day='SAT' />
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

const getNextTimeslotRange = availability => {
  const lastAvailableTime = availability[availability.length - 1][1]
  const index = timeOptions.indexOf(lastAvailableTime)
  const start = timeOptions[index + 1]
  const end = timeOptions[index + 2]
  if (['11:00 PM', '11:30 PM'].includes(lastAvailableTime)) {
    return [timeOptions[0], timeOptions[1]]
  } else {
    return [start, end]
  }
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
    <div className='banner-with-hr'>
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

// const consolidateAvailability = (availability: string[][], eventTarget) => {
// }

const subOptions = (startTime, isStart, idx) => {
  const index = idx === 0 ? 0 : timeOptions.indexOf(startTime)
  return isStart ? timeOptions.slice(index) : timeOptions.slice(index + 1)
}

const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const [displayCopyModal, toggleDisplayCopyModal] = useState([false])
  const defaultHoverState = {
    SUN: [false],
    MON: [false],
    TUE: [false],
    WED: [false],
    THU: [false],
    FRI: [false],
    SAT: [false],
  }
  const [hover, setHover] = useState({
    addTime: defaultHoverState,
    copyTime: defaultHoverState,
  })
  const [clipboard, setClipboard] = useState({
    timeslot: null,
    from: null,
    to: null,
  })

  const handleTimeChange = e => {
    // add a check that the partner time is before or after
    // new time, depending on start or end
    // auto adjust if needed
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

  const handleDelete = (day, idx) => {
    if (days[day].availability.length <= 1) {
      setDays({
        ...days,
        [day]: {
          available: false,
          availability: [['9:00 AM', '5:00 PM']],
        },
      })
    } else {
      const oldAvailability = days[day].availability
      const newAvailalability = oldAvailability
      newAvailalability.splice(idx, 1)
      setDays({
        ...days,
        [day]: {
          available: days[day].available,
          availability: newAvailalability,
        },
      })
    }
  }

  const handleAddSlot = (e, day) => {
    const availability = days[day].availability
    const nextSlot = getNextTimeslotRange(availability)

    setHover({
      ...hover,
      [day]: false,
    })

    setDays({
      ...days,
      [day]: {
        availability: [...days[day].availability, nextSlot],
        available: days[day].available,
      },
    })
  }

  const renderHoverText = (hoverType, day, idx) => {
    console.log(hover)
    const newHover = hover[hoverType][day]
    const index = hoverType === 'addTime' ? 0 : idx
    newHover[index] = !hover[hoverType][day][index]
    console.log(newHover)
    console.log({
      ...hover,
      [hoverType]: {
        ...hover[hoverType],
        [day]: newHover,
      },
    })
    setHover({
      ...hover,
      addTime: {
        ...hover['addTime'],
        [day]: newHover,
      },
    })
  }

  const handleCopy = (day, idx) => {
    console.log(idx)

    console.log(displayCopyModal)
    console.log(displayCopyModal[idx])
    const newDisplay = displayCopyModal
    newDisplay[idx] = !displayCopyModal[idx]
    toggleDisplayCopyModal(newDisplay)
    console.log('handle copy')
    console.log(day)
    console.log(idx)
    console.log(days[day].availability[idx])
    const timeslot = days[day].availability[idx]
    setClipboard({
      timeslot,
      from: day,
      to: null,
    })
    console.log(clipboard)
  }

  return (
    <div className='timeslots-container'>
      {slots.map((slot, idx) => (
        <div className='timeslot-input'>
          {/* Make a new custom component for these that takes in arguments like day, start/end, to keep this clean */}
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
              onClick={() => handleDelete(day, idx)}
            />
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <div>
                <AddRounded
                  onMouseEnter={() => renderHoverText('addTime', day, idx)}
                  onMouseOut={() => renderHoverText('addTime', day, idx)}
                  onClick={e => handleAddSlot(e, day)}
                />

                {/* {hover.addTime[day][0] && (
                  <HoverMessage text={`New time period for ${day}`} />
                )} */}
              </div>
            )}
            {/* this has to move to a div bc the icon is weird */}
            <ContentCopyOutlined
              onMouseEnter={() => renderHoverText('copyTime', day, idx)}
              onMouseOut={() => renderHoverText('copyTime', day, idx)}
              onClick={() => handleCopy(day, idx)}
            />
            {/* {hover.copyTime[day][idx] && (
              <HoverMessage text={`Copy times for ${day}`} />
            )} */}
            {displayCopyModal[idx] && <CopyTimesModal day={day} />}
          </div>
        </div>
      ))}
    </div>
  )
}
