import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DAYS } from 'utils/data/calendarConstants'

export const RecurringDays = ({ recurrenceInfo, handleSelect }) => {
  return (
    <>
      <ToggleButtonGroup
        size='small'
        arial-label='Days of the week'
        value={recurrenceInfo.days}
        onChange={handleSelect}
        disabled={!recurrenceInfo.enabled}
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
