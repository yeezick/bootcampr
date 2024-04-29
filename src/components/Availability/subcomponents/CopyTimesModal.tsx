import { Checkbox } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import './CopyTimesModal.scss'
import { weekdaysMap } from '../utils/data'
import { PrimaryButton } from 'components/Buttons'

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
      <PrimaryButton
        onClick={handleApply}
        label='Apply'
        disabled={isDisabled}
        fullWidth
        style={{ marginTop: '10px' }}
      />
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
