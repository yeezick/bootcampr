import { MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { timeOptions } from 'utils/data/calendarConstants'
import { combineDateWithTime, roundToNearestHalfHour } from 'utils/helpers'

export const SelectTime = ({ dateFields, dayjs, setDateFields, type }) => {
  const [selectedTime, setSelectedTime] = useState(
    roundToNearestHalfHour(dayjs(dateFields.date).format('hh:mm A'))
  )
  const [availableOptions, setAvailableOptions] = useState(timeOptions)
  const { date } = dateFields

  /* 
  Handles end time in following cases:
    - If start > time, set end time to be next option in select
    - If new start < time, keep current end time selection
  */
  useEffect(() => {
    const currStartTime = roundToNearestHalfHour(
      dateFields.start.format('h:mm A')
    )
    const currEndTime = roundToNearestHalfHour(dateFields.end.format('h:mm A'))
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
  }, [dateFields.start])

  const handleTimeChange = e => {
    const { value } = e.target
    setSelectedTime(value)
    setDateFields({
      ...dateFields,
      [type]: combineDateWithTime(date, value),
    })
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
