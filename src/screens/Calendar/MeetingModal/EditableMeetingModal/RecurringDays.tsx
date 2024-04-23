import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DAYS } from 'utils/data/calendarConstants'

export const RecurringDays = ({ recurrence, handleSelect, days }) => {
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
