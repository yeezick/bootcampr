import { MenuItem, Select } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Timezones } from '../utils/data'

export const TimeZoneInputBanner = ({ setTimezone, timezone }) => {
  console.log(Timezones)

  return (
    <div className='timezone-input-container'>
      <h2>Time zone</h2>
      {Timezones[timezone]}
      {/* <Select
        defaultValue={timezone}
        disableUnderline
        IconComponent={ExpandMoreRounded}
        sx={tzSelectSx}
        value={timezone}
        variant='standard'
        onChange={e => setTimezone(e.target.value)}
      >
        {Object.keys(Timezones).map(zone => (
          <MenuItem key={zone} value={Timezones[zone]}>
            {Timezones[zone]}
          </MenuItem>
        ))}
      </Select> */}
    </div>
  )
}

const tzSelectSx = {
  color: '#022888',
  fontSize: '12px',
  '& .MuiSvgIcon-root': { color: '#022888' },
}
