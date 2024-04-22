import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const RecurringDays = () => {
  const DAYS = [
    {
      key: 'sunday',
      label: 'S',
    },
    {
      key: 'monday',
      label: 'M',
    },
    {
      key: 'tuesday',
      label: 'T',
    },
    {
      key: 'wednesday',
      label: 'W',
    },
    {
      key: 'thursday',
      label: 'T',
    },
    {
      key: 'friday',
      label: 'F',
    },
    {
      key: 'saturday',
      label: 'S',
    },
  ]
  const [days, setDays] = useState([0])
  return (
    <>
      <ToggleButtonGroup
        size='small'
        arial-label='Days of the week'
        value={days}
        onChange={(event, value) => setDays(value)}
      >
        {DAYS.map((day, index) => (
          <ToggleButton key={day.key} value={index} aria-label={day.key}>
            {day.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}
