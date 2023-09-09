import { KeyboardArrowDown } from '@mui/icons-material'
import { FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { usTimeZones } from 'utils/data/calendarConstants'

export const SelectTimeZone = ({ dateFields, setDateFields, timeZone }) => {
  const [openSelect, setOpenSelect] = useState(false)
  const toggleSelect = () => setOpenSelect(!openSelect)
  const handleTimeZone = e =>
    setDateFields({ ...dateFields, timeZone: e.target.value })

  return (
    <div className='timezone-wrapper'>
      <p>TimeZone </p>
      <FormControl
        aria-label='timezone'
        hiddenLabel={true}
        sx={{ alignSelf: 'center', fontSize: '14px' }}
      >
        <Select
          disableUnderline={true}
          IconComponent={CustomArrowDown(toggleSelect)}
          onChange={handleTimeZone}
          onClick={toggleSelect}
          open={openSelect}
          sx={timeZoneSelectStyles}
          variant='standard'
          value={timeZone}
        >
          {usTimeZones.map(timeZone => (
            <MenuItem value={timeZone.value} key={timeZone.value}>
              {timeZone.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const CustomArrowDown = toggleSelect => {
  return () => (
    <KeyboardArrowDown onClick={toggleSelect} sx={{ color: '#022888' }} />
  )
}

const timeZoneSelectStyles = {
  color: '#022888',
  fontSize: '14px',
  '& .MuiSelect-select.MuiInputBase-input': {
    paddingRight: '0px',
  },
  ':hover': {
    cursor: 'pointer',
  },
}
