import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export const RecurringCheckbox = ({ recurrence, setRecurrence }) => {
  return (
    <FormControlLabel
      label='Reccuring Meeting'
      control={
        <Checkbox
          checked={recurrence}
          onChange={() => setRecurrence(!recurrence)}
        />
      }
    />
  )
}
