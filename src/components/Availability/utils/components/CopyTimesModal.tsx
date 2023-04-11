import { Checkbox } from '@mui/material'
import { useState } from 'react'
import './CopyTimesModal.scss'

export const CopyTimesModal = ({ day }) => {
  const [checked, setChecked] = useState({
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
      <p>Copy available times to:</p>
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
    </div>
  )
}

const CopyTimesOption = ({ day, selectedDay, checked, setChecked }) => {
  const isDisabled = day.substring(0, 3) === selectedDay
  const textColor = isDisabled ? '#86888a' : 'black'

  return (
    <div className='copy-times-option'>
      <Checkbox
        disabled={isDisabled}
        checked={true}
        name={day}
        sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
      />
      <h2 style={{ color: textColor }}>{day}</h2>
    </div>
  )
}
