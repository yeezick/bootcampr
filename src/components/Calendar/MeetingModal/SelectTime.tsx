import { MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { timeOptions } from 'utils/data/calendarConstants'
import { combineDateWithTime, roundToNearestHalfHour } from 'utils/helpers'

export const SelectTime = ({ dateFields, dayjs, setDateFields, type }) => {
  const [selectedTime, setSelectedTime] = useState(
    roundToNearestHalfHour(dayjs(dateFields.date).format('hh:mm A'))
  )
  const { date } = dateFields

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
      size='small'
      value={selectedTime}
      variant='filled'
    >
      {timeOptions.map(time => (
        <MenuItem key={`${type}-option-${time}`} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  )
}
