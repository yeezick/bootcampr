import {
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import { SelectTimeInput } from './SelectTimeInput'
import { Checkbox } from '@mui/material'
import { useState, useEffect } from 'react'
import './CopyTimesModal.scss'
import { useDispatch } from 'react-redux'
import { setUserAvailability } from 'utils/redux/slices/userSlice'
import {
  consolidateAvailability,
  deleteTimeSlot,
  addTimeSlot,
  renderCopyTimesModal,
  copyTimes,
} from '../utils/helpers'

export const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const dispatch = useDispatch()
  const [displayModal, toggleDisplayModal] = useState({
    0: false,
  })

  const getDisplay = idx => {
    return displayModal[idx]
  }

  useEffect(() => {
    dispatch(setUserAvailability(days))
  }, [days])

  return (
    <div className='timeslots-container'>
      {consolidateAvailability(days[day].availability).map((slot, idx) => (
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
              onClick={() => deleteTimeSlot(day, days, setDays, idx)}
            />
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <AddRounded
                onClick={() => addTimeSlot(day, days, setDays, idx)}
              />
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
                onClick={() =>
                  renderCopyTimesModal(idx, displayModal, toggleDisplayModal)
                }
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
        <CopyTimesOption
          day={shortday}
          selectedDay={day}
          checked={checked}
          setChecked={setChecked}
        />
      ))}
      <button
        className='apply'
        onClick={() => copyTimes(checked, day, days, idx, setDays)}
      >
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
