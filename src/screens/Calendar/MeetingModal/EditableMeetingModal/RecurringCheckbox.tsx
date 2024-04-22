import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export const RecurringCheckbox = ({ handleChange, recurrence }) => {
  return (
    <FormControlLabel
      label='Reccuring Meeting'
      control={<Checkbox checked={recurrence} onChange={handleChange} />}
    />
  )
}
