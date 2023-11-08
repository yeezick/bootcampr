import { MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { timeOptions } from 'utils/data/calendarConstants'
import { combineDateWithTime, formatIsoToHalfHour } from 'utils/helpers'

export const SelectTime = ({ dateFields, setDateFields, type }) => {
  const [availableOptions, setAvailableOptions] = useState(timeOptions)
  const [selectedTime, setSelectedTime] = useState(
    formatIsoToHalfHour(dateFields[type])
  )
  const { date } = dateFields

  /* CONTEXT (useEffect)
  Handles end time in following cases:
    - If start > time, set end time to be next option in select
    - If new start < time, keep current end time selection
  */

  useEffect(() => {
    const currStartTime = formatIsoToHalfHour(dateFields.start)
    const currEndTime = formatIsoToHalfHour(dateFields.end)
    const endIdx = timeOptions.findIndex(option => option === currEndTime)
    const startIdx = timeOptions.findIndex(option => option === currStartTime)
    if (type === 'end') {
      const filteredOptions = timeOptions.slice(startIdx + 1)
      const isEndEarlierThanStart = startIdx > endIdx || startIdx === endIdx
      setAvailableOptions(timeOptions.slice(startIdx + 1))
      if (isEndEarlierThanStart) {
        setSelectedTime(filteredOptions[0])
      }
    }
  }, [dateFields.start, dateFields.end])

  const handleTimeChange = e => {
    const { value } = e.target
    const updatedDateFields = { ...dateFields }

    if (type === 'start') {
      const nextIdx = timeOptions.findIndex(option => option === value)
      updatedDateFields[type] = combineDateWithTime(date, value)
      updatedDateFields['end'] = combineDateWithTime(date, timeOptions[nextIdx])
      setDateFields(updatedDateFields)
    } else if (type === 'end') {
      updatedDateFields[type] = combineDateWithTime(date, value)
      setDateFields(updatedDateFields)
    }
    setSelectedTime(value)
  }

  return (
    <Select
      onChange={handleTimeChange}
      MenuProps={{ sx: { marginTop: '3px', height: '400px' } }}
      size='small'
      sx={selectTimeStyles}
      value={selectedTime}
    >
      {availableOptions.map(time => (
        <MenuItem key={`${type}-option-${time}`} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  )
}

const selectTimeStyles = {
  background: '#ECEBEB',
  border: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .Mui-Paper-root': {
    height: '50px',
  },
}
