import { MenuItem, Select, Typography } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Timezones } from '../utils/data'

export const TimeZoneInputBanner = ({ setTimezone, timezone }) => {
  return (
    <div className='timezone-input-container'>
      <h1>Time zone</h1>
      <Typography sx={tzSelectSx}>{Timezones[timezone]}</Typography>
    </div>
  )
}

const tzSelectSx = {
  color: '#022888',
  fontSize: '12px',
  '& .MuiSvgIcon-root': { color: '#022888' },
}
