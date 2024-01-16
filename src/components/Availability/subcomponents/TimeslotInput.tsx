import {
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { SelectTimeInput } from './SelectTimeInput'
import { Checkbox, Tooltip } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
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
import { weekdaysMap } from '../utils/data'
import { PrimaryButton } from 'components/Buttons'
import { BCToolTip } from 'components/ToolTip/ToolTip'

export const TimeSlotInput = ({ day, days, setDays }) => {
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

  const handleRenderModal = (e, idx) => {
    renderCopyTimesModal(idx, displayModal, toggleDisplayModal)
  }

  return (
    <div className='timeslots-container'>
      {consolidateAvailability(days[day].availability).map((slot, idx) => (
        <div key={`${slot}-${idx}`} className='timeslot-input'>
          <div className='left-banner'>
            {/* TODO: make a reusable component for these? */}
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
            <div className='clickable-icon'>
              <FaRegTrashAlt
                className='react-icon'
                onClick={() => deleteTimeSlot(day, days, setDays, idx)}
              />
            </div>
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <BCToolTip
                text={`New time block for ${weekdaysMap[day]}`}
                child={
                  <div className='clickable-icon'>
                    <AddRounded
                      onClick={() => addTimeSlot(day, days, setDays, idx)}
                      className='icon'
                    />
                  </div>
                }
              />
            )}
            <div>
              {getDisplay(idx) && (
                <CopyTimesModal
                  days={days}
                  day={day}
                  idx={idx}
                  copyTimes={copyTimes}
                  setDays={setDays}
                  handleRenderModal={handleRenderModal}
                />
              )}
              <BCToolTip
                text='Copy available time to other days'
                child={
                  <div className='clickable-icon'>
                    <ContentCopyOutlined
                      onClick={e => handleRenderModal(e, idx)}
                      className='icon'
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CopyTimesModal = ({
  days,
  day,
  idx,
  copyTimes,
  setDays,
  handleRenderModal,
}) => {
  const timeString = `${days[day].availability[idx][0]} - ${days[day].availability[idx][1]}`
  const [checked, setChecked] = useState({
    Everyday: false,
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  })
  const [isDisabled, setIsDisabled] = useState(true)

  const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const modalEl = useRef<any>()

  const handleApply = e => {
    copyTimes(checked, day, days, idx, setDays)
    handleRenderModal(e, idx)
  }

  useEffect(() => {
    const handler = e => {
      if (!modalEl.current) {
        return
      }
      if (!modalEl.current.contains(e.target)) {
        handleRenderModal(e, idx)
      }
    }

    document.addEventListener('click', handler, true)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  useEffect(() => {
    const {
      Everyday,
      Sunday,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
    } = checked
    const validSelection =
      Everyday ||
      Sunday ||
      Monday ||
      Tuesday ||
      Wednesday ||
      Thursday ||
      Friday ||
      Saturday

    setIsDisabled(!validSelection)
  }, [checked])

  return (
    <div className='copy-times-modal' ref={modalEl}>
      <p className='copy-times-text'>
        Copy <strong>{timeString}</strong> to:
      </p>
      <CopyTimesOption
        day='Everyday'
        selectedDay={day}
        checked={checked}
        setChecked={setChecked}
        key={idx}
      />
      {weekdayNames.map(
        weekdayName =>
          weekdayName != weekdaysMap[day] && (
            <CopyTimesOption
              day={weekdayName}
              selectedDay={day}
              checked={checked}
              setChecked={setChecked}
              key={weekdayName}
            />
          )
      )}
      <div className='apply-submit-button'>
        <PrimaryButton
          handler={handleApply}
          text='Apply'
          disabled={isDisabled}
          customStyle={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

const CopyTimesOption = ({ day, selectedDay, checked, setChecked }) => {
  const handleChange = e => {
    if (day === 'Everyday') {
      const toggle = !checked.Everyday
      setChecked({
        ...{
          Everyday: toggle,
          Sunday: toggle,
          Monday: toggle,
          Tuesday: toggle,
          Wednesday: toggle,
          Thursday: toggle,
          Friday: toggle,
          Saturday: toggle,
          [selectedDay]: false,
        },
      })
    } else {
      let newEveryday = checked.Everyday
      if (checked[day]) {
        newEveryday = false
      }
      setChecked({
        ...checked,
        [day]: !checked[day],
        Everyday: newEveryday,
      })
    }
  }
  return (
    <div className='copy-times-option'>
      <Checkbox
        checked={checked[day]}
        onChange={handleChange}
        name={day}
        sx={{ color: 'black', '&.Mui-checked': { color: '#022888' } }}
      />
      <h2
        className='copy-times-option-days'
        style={{ color: 'black', width: 100, fontSize: '17px' }}
      >
        {day}
      </h2>
    </div>
  )
}
