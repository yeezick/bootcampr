import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const RecurringDays = ({ recurrence }) => {
  const DAYS = [
    {
      key: 'SU',
      label: 'S',
    },
    {
      key: 'MO',
      label: 'M',
    },
    {
      key: 'TU',
      label: 'T',
    },
    {
      key: 'WE',
      label: 'W',
    },
    {
      key: 'TH',
      label: 'T',
    },
    {
      key: 'FR',
      label: 'F',
    },
    {
      key: 'SA',
      label: 'S',
    },
  ]
  const [days, setDays] = useState([])
  const handleSelect = (event, value) => {
    setDays(value)
  }

  return (
    <>
      <ToggleButtonGroup
        size='small'
        arial-label='Days of the week'
        value={days}
        onChange={handleSelect}
        disabled={!recurrence}
      >
        {DAYS.map((day, index) => (
          <ToggleButton key={day.key} value={day.key} aria-label={day.key}>
            {day.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}
