import { MenuItem, Select } from '@mui/material'
import { timeOptions } from '../utils/data'
import { handleTimeChange } from '../utils/helpers'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserAvailability } from 'utils/redux/slices/userSlice'

export const SelectTimeInput = ({
  isStart,
  day,
  idx,
  slot,
  days,
  setDays,
  toggleDisableAdd,
}) => {
  const index = isStart ? 0 : 1
  const [inputTimeOptions, setInputTimeOptions] = useState(timeOptions)
  const dispatch = useDispatch()

  useEffect(() => {
    if (['11:00 PM', '11:30 PM'].includes(days[day].availability[idx][index])) {
      toggleDisableAdd(true)
    } else {
      toggleDisableAdd(false)
    }
    if (!isStart) {
      const earliestLogicalOptionIndex = timeOptions.findIndex(
        timeOption => timeOption === slot[0]
      )

      const logicalEndOptions = [
        ...timeOptions.slice(earliestLogicalOptionIndex + 1),
      ]
      setInputTimeOptions(logicalEndOptions)
    } else {
      const startTimeOptions = [...timeOptions]
      startTimeOptions.pop()
      setInputTimeOptions(startTimeOptions)
    }
    dispatch(setUserAvailability(days))
  }, [days])

  return (
    <Select
      defaultValue={slot[index]}
      inputProps={{ sx: { padding: '8px 13px !important' } }}
      MenuProps={menuPropsSX}
      name={`${day}-${idx}-${index}`}
      onChange={e => handleTimeChange(e, days, setDays, isStart)}
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
  margin: '0px',
  fontSize: '16px',
  '& .MuiSvgIcon-root': { display: 'none' },
  backgroundColor: '#fefefe',
  borderColor: 'black',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid black',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0D47A1;',
  },
  '& .MuiPopover-root .MuiPaper-root': {
    marginLeft: '0px',
    width: '120px',
  },
  '& .MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
    width: '120px',
  },
  '& .MuiMenu-root .MuiMenuItem-root': {
    minWidth: '0px',
  },
  width: '108px',
  elevation: '0',
}

const menuPropsSX = {
  PaperProps: {
    sx: {
      maxHeight: 340,
      maxWidth: 108,
    },
  },
  disableScrollLock: true,
}
