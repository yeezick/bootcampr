import { MenuItem, Select } from '@mui/material'
import { timeOptions } from '../utils/data'
import { consolidateAvailability, handleTimeChange } from '../utils/helpers'

export const SelectTimeInput = ({ isStart, day, idx, slot, days, setDays }) => {
  const index = isStart ? 0 : 1

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
      {timeOptions.map(time => (
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
  '.MuiOutlinedInput-notchedOutline': { border: 0 },
  width: '87px',
  fieldset: {
    border: 'none !important',
    outline: 'none !important',
  },
  elevation: '0',
}

const menuPropsSX = {
  PaperProps: {
    sx: {
      boxShadow: 0,
      marginLeft: 2.5,
      marginTop: 0.5,
      maxHeight: 160,
      width: 130,
    },
  },
}
