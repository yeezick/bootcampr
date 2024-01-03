import { MenuItem, Select } from '@mui/material'
import { timeOptions } from '../utils/data'
import { handleTimeChange } from '../utils/helpers'
import { useState, useEffect } from 'react'

export const SelectTimeInput = ({ isStart, day, idx, slot, days, setDays }) => {
  const index = isStart ? 0 : 1
  const [inputTimeOptions, setInputTimeOptions] = useState(timeOptions)

  useEffect(() => {
    if (!isStart) {
      const earliestLogicalOptionIndex = timeOptions.findIndex(
        timeOption => timeOption === slot[0]
      )
      const logicalEndOptions = timeOptions.slice(
        earliestLogicalOptionIndex + 1,
        timeOptions.length
      )
      setInputTimeOptions(logicalEndOptions)
    }
  }, [days])

  return (
    <Select
      defaultValue={slot[index]}
      inputProps={{ sx: { padding: '8px 13px !important' } }}
      MenuProps={menuPropsSX}
      name={`${day}-${idx}-${index}`}
      onChange={e => handleTimeChange(e, days, setDays)}
      size='small'
      sx={selectSX}
      value={days[day].availability[idx][index]}
    >
      {inputTimeOptions.map(time => (
        <MenuItem key={`option-${time}`} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  )
}

const selectSX = {
  padding: '0 !important',
  fontSize: '14px',
  '& .MuiSvgIcon-root': { display: 'none' },
  backgroundColor: '#fefefe',
  '.MuiOutlinedInput-notchedOutline': { border: 1 },
  width: '87px',
  elevation: '0',
}

const menuPropsSX = {
  PaperProps: {
    sx: {
      boxShadow: 0,
      marginLeft: 2.5,
      marginTop: 0.5,
      maxHeight: 340,
      width: 130,
    },
  },
}
