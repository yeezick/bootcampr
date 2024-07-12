import React, { useState } from 'react'
import { Modal, Box, Checkbox, FormControlLabel, Button } from '@mui/material'

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const CustomRecurrenceModal = ({
  onSave,
  onClose,
  open,
  daysOfWeek,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const handleCheckboxChange = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleSave = () => {
    onSave(selectedDays)
    onClose()
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ width: 300, p: 4, bgcolor: 'background.paper', m: 'auto', mt: 8 }}
      >
        <h3>Set weekly on:</h3>
        {daysOfWeek.map(day => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={() => handleCheckboxChange(day)}
              />
            }
            label={day}
          />
        ))}
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  )
}
