import { KeyboardArrowDown } from '@mui/icons-material'
import { FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { usTimeZones } from 'utils/data/calendarConstants'
import '../styles/SelectTimeZone.scss'

export const SelectTimeZone = ({ dateFields, setDateFields, timeZone }) => {
  const [openSelect, setOpenSelect] = useState(false)
  const toggleSelect = () => setOpenSelect(!openSelect)
  const handleTimeZone = e =>
    setDateFields({ ...dateFields, timeZone: e.target.value })

  return (
    <div className='timezone-wrapper'>
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
  color: 'black',
  border: '1.5px solid black',
  borderRadius: '5px',
  padding: '5px',
  fontSize: '14px',
  width: '320px',

  '& .MuiSelect-select.MuiInputBase-input': {
    paddingRight: '0px',
  },
  ':hover': {
    cursor: 'pointer',
  },
}
