import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export const RecurringCheckbox = ({
  recurrenceEnabled,
  setRecurrenceEnabled,
}) => {
  return (
    <FormControlLabel
      label='Reccuring Meeting'
      control={
        <Checkbox
          checked={recurrenceEnabled}
          onChange={() => setRecurrenceEnabled(!recurrenceEnabled)}
        />
      }
    />
  )
}
