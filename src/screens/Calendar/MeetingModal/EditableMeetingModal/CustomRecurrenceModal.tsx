import React, { useState } from 'react'
import { Modal, Box, Checkbox, FormControlLabel, Button } from '@mui/material'
import '../styles/CustomRecurrence.scss'
import { classNames } from 'react-easy-crop/helpers'
import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

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
        sx={{
          width: 450,
          p: 4,
          bgcolor: 'background.paper',
          m: 'auto',
          mt: 20,
        }}
      >
        <div className='custom-recurrence-modal'>
          <h2>Set custom meeting cadence</h2>
          <h3>Repeat weekly on:</h3>
          {daysOfWeek.map(day => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={selectedDays.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                  sx={checkboxStyle}
                />
              }
              label={day}
              className='custom-label'
            />
          ))}
          <ButtonContainer gap={32} style={{ marginTop: '23px' }}>
            <TextButton
              label='Cancel'
              onClick={onClose}
              colorScheme='primary'
              style={{ padding: '0px 17px 0px 17px' }}
            />
            <PrimaryButton
              //loading={isLoading}
              colorScheme='primary'
              disabled={selectedDays.length > 0 ? false : true}
              onClick={handleSave}
              label='Save'
            />
          </ButtonContainer>
        </div>
      </Box>
    </Modal>
  )
}

const checkboxStyle = {
  '& .MuiSvgIcon-root': {
    fill: '#1A237E',
  },
}

const labelStyle = {
  fontSize: '16px', // Change this value to your desired font size
  // Add more styles if needed
}
