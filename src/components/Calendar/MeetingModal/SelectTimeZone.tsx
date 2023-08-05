import { KeyboardArrowDown } from '@mui/icons-material'
import { FormControl, MenuItem, Select } from '@mui/material'
import { usTimeZones } from 'utils/data/calendarConstants'

export const SelectTimeZone = ({ dateFields, setDateFields, timeZone }) => {
  const handleTimeZone = e =>
    setDateFields({ ...dateFields, timeZone: e.target.value })

  return (
    <div className='timezone-wrapper'>
      <p>TimeZone </p>
      <FormControl
        aria-label='timezone'
        hiddenLabel={true}
        sx={{
          alignSelf: 'center',
          fontSize: '14px',
        }}
      >
        <Select
          defaultValue={timeZone}
          disableUnderline={true}
          IconComponent={CustomArrowDown}
          onChange={handleTimeZone}
          sx={{
            color: '#022888',
            fontSize: '14px',
            '& .MuiSelect-select.MuiInputBase-input': {
              paddingRight: '0px',
            },
          }}
          variant='standard'
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

const CustomArrowDown = () => <KeyboardArrowDown sx={{ color: '#022888' }} />
