import {
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import { SelectTimeInput } from './SelectTimeInput'
import { timeOptions } from '../utils/data'
import { Checkbox } from '@mui/material'
import { useState, useEffect } from 'react'
import './CopyTimesModal.scss'
import { useDispatch } from 'react-redux'
import { setUserAvailability } from 'utils/redux/slices/userSlice'

export const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const dispatch = useDispatch()
  const [displayModal, toggleDisplayModal] = useState({
    0: false,
  })
  const [display, toggleDisplay] = useState(true)
  const handleHover = (idx, display, action) => {
    console.log(
      `Add hover placeholder for ${day}, timeslot ${
        idx + 1
      }, display: ${display}, action: ${action}`
    )
  }

  const getDisplay = idx => {
    console.log('get display')
    console.log(displayModal[idx])
    console.log(displayModal)
    return displayModal[idx]
  }

  useEffect(() => {
    console.log('display modal changed')
    console.log('huh')
    dispatch(setUserAvailability(days))
    toggleDisplay(true)
  }, [days, displayModal])

  const getNextTimeslot = currentTime => {
    const index = timeOptions.indexOf(currentTime)
    return [timeOptions[index + 1], timeOptions[index + 2]]
  }

  const deleteTimeSlot = (day, idx) => {
    let newAvailability
    if (days[day].availability.length === 1) {
      newAvailability = {
        available: false,
        availability: [['9:00 AM', '5:00 PM']],
      }
    } else {
      newAvailability = {
        available: true,
        availability: [...days[day].availability],
      }
      newAvailability.availability.splice(idx, 1)
    }

    setDays({
      ...days,
      [day]: {
        ...newAvailability,
      },
    })
  }

  const addTimeSlot = (day, idx) => {
    const nextTimeslot = getNextTimeslot(days[day].availability[idx][1])
    const newAvailability = [...days[day].availability]
    newAvailability.push(nextTimeslot)

    console.log(newAvailability)
    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: newAvailability,
      },
    })
  }

  const renderCopyTimesModal = (day, idx) => {
    console.log('render copy times modal')
    console.log(displayModal)
    const newState = displayModal
    newState[idx] = !displayModal[idx]
    console.log('new state')
    console.log(newState)

    toggleDisplayModal({
      ...displayModal,
      ...newState,
    })
    console.log(displayModal)
  }

  const copyTimes = (checked, day, idx, setDays) => {
    console.log("Let's copy these times!")

    const daysToPasteTo = Object.keys(checked).filter(
      day => day != 'EVRY' && checked[day]
    )
    console.log(daysToPasteTo)
    const copiedTimeslot = [days[day].availability[idx]]
    console.log(copiedTimeslot)
    const newAvail = {}
    daysToPasteTo.forEach(day => {
      newAvail[day] = {
        available: true,
        availability: days[day].availability.concat(copiedTimeslot),
      }
    })
    setDays({
      ...days,
      ...newAvail,
    })
  }

  // Don't abstract to this degree
  const handleIconClick = (icon, day, idx) => {
    console.log(`clicked on ${icon}, for ${day}, index: ${idx}`)
    switch (icon) {
      case 'add':
        addTimeSlot(day, idx)
        break
      case 'delete':
        deleteTimeSlot(day, idx)
        break
      case 'copy':
        renderCopyTimesModal(day, idx)
        break
      default:
        break
    }
  }

  return (
    <div className='timeslots-container'>
      {days[day].availability.map((slot, idx) => (
        <div key={`${slot}-${idx}`} className='timeslot-input'>
          <div className='left-banner'>
            <SelectTimeInput
              isStart={true}
              idx={idx}
              slot={slot}
              day={day}
              days={days}
              setDays={setDays}
            />
            <h4>--</h4>
            <SelectTimeInput
              isStart={false}
              day={day}
              idx={idx}
              slot={slot}
              days={days}
              setDays={setDays}
            />
            <DeleteOutline
              className='icon'
              onClick={() => handleIconClick('delete', day, idx)}
            />
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <div className='hover-icon'>
                <AddRounded
                  onMouseEnter={() => handleHover(idx, 'show', 'add')}
                  onMouseOut={() => handleHover(idx, 'hide', 'add')}
                  onClick={() => handleIconClick('add', day, idx)}
                />
              </div>
            )}
            <div className='hover-icon'>
              {getDisplay(idx) && (
                <CopyTimesModal
                  days={days}
                  day={day}
                  idx={idx}
                  copyTimes={copyTimes}
                  setDays={setDays}
                />
              )}
              <ContentCopyOutlined
                onMouseEnter={() => handleHover(idx, 'show', 'copy')}
                onMouseOut={() => handleHover(idx, 'hide', 'copy')}
                onClick={() => handleIconClick('copy', day, idx)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CopyTimesModal = ({ days, day, idx, copyTimes, setDays }) => {
  const timeString = `${days[day].availability[idx][0]} - ${days[day].availability[idx][1]}`
  const [checked, setChecked] = useState({
    EVRY: false,
    SUN: false,
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
  })
  return (
    <div className='copy-times-modal'>
      <p>
        Copy <strong>{timeString}</strong> to:
      </p>
      <CopyTimesOption
        day='EVERY DAY'
        selectedDay={day}
        checked={checked}
        setChecked={setChecked}
      />
      {[
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ].map(shortday => (
        // render code directly to better handle state
        <CopyTimesOption
          day={shortday}
          selectedDay={day}
          checked={checked}
          setChecked={setChecked}
        />
      ))}
      <button onClick={() => copyTimes(checked, day, idx, setDays)}>
        Apply
      </button>
    </div>
  )
}

const CopyTimesOption = ({ day, selectedDay, checked, setChecked }) => {
  const isDisabled = day.substring(0, 3) === selectedDay
  const textColor = isDisabled ? '#86888a' : 'black'

  const handleChange = e => {
    if (day === 'EVERY DAY') {
      console.log('day = ' + day)
      const toggle = !checked.EVRY
      setChecked({
        ...{
          EVRY: toggle,
          SUN: toggle,
          MON: toggle,
          TUE: toggle,
          WED: toggle,
          THU: toggle,
          FRI: toggle,
          SAT: toggle,
          [selectedDay]: false,
        },
      })
    } else {
      setChecked({
        ...checked,
        [day.slice(0, 3)]: !checked[day.slice(0, 3)],
      })
    }
  }
  return (
    <div className='copy-times-option'>
      <Checkbox
        disabled={isDisabled}
        checked={checked[day.slice(0, 3)]}
        onChange={e => handleChange(e)}
        name={day}
        sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
      />
      <h2 style={{ color: textColor }}>{day}</h2>
    </div>
  )
}
