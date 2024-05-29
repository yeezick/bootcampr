import { MenuItem, Select } from '@mui/material'
import { produce } from 'immer'
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
    const startIdx = timeOptions.findIndex(option => option === currStartTime)
    // BC-649: end is missing use case when user selects 11:30pm and available times should reset and day should be set for the next
    if (type === 'end') {
      setAvailableOptions(timeOptions.slice(startIdx + 1))
      setSelectedTime(formatIsoToHalfHour(dateFields[type]))
    }
  }, [dateFields.start, dateFields.end])

  const handleTimeChange = e => {
    console.log(dateFields)
    const { value } = e.target
    const updatedDateFields = { ...dateFields }

    if (type === 'start') {
      const currEndTime = formatIsoToHalfHour(dateFields.end)
      const endIdx = timeOptions.findIndex(option => option === currEndTime)
      const startIdx = timeOptions.findIndex(option => option === value)
      const nextIdx = startIdx + 1
      const startTimeLaterThanEnd = startIdx >= endIdx

      const updatedDateFields = produce(dateFields, draft => {
        draft[type] = combineDateWithTime(date, value)
        if (startTimeLaterThanEnd) {
          draft.end = combineDateWithTime(date, timeOptions[nextIdx])
        }
      })
      console.log(updatedDateFields)
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
      IconComponent={() => null}
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
  background: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid black',
  },
  '& .Mui-Paper-root': {
    height: '50px',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1.5px solid black',
    },
  },
}
