import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export const RecurringCheckbox = ({ recurrenceInfo, setRecurrenceInfo }) => {
  const handleCheckbox = () => {
    setRecurrenceInfo({
      ...recurrenceInfo,
      enabled: !recurrenceInfo.enabled,
      days: !recurrenceInfo.enabled ? recurrenceInfo.days : [], // Clear days when disabling
    })
  }

  return (
    <FormControlLabel
      label='Reccuring Meeting'
      control={
        <Checkbox checked={recurrenceInfo.enabled} onChange={handleCheckbox} />
      }
    />
  )
}
