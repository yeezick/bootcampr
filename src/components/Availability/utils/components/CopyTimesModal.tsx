import { Checkbox } from '@mui/material'
import { useState } from 'react'
import './CopyTimesModal.scss'

export const CopyTimesModal = ({ day }) => {
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
        // render code directly to better handle state
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
    console.log(day)
    console.log('selected day')
    console.log(selectedDay)
    console.log(checked)
    console.log(e.target)
    console.log(checked[selectedDay])
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
