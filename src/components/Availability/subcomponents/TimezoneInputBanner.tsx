import { MenuItem, Select } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Timezones } from '../utils/data'
import { setUserTimezone } from 'utils/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { bootcamprTimezoneToUTCMap } from 'utils/data/timeZoneConstants'

export const TimeZoneInputBanner = ({ setTimezone, timezone }) => {
  const dispatch = useDispatch()

  const handleChange = e => {
    const timezoneValue = e.target.value
    const userTZinUTC = bootcamprTimezoneToUTCMap[timezoneValue]

    setTimezone(timezoneValue)
    dispatch(setUserTimezone(userTZinUTC))
  }

  return (
    <div className='timezone-input-container'>
      <h2>Availability</h2>
      <Select
        defaultValue={timezone}
        disableUnderline
        IconComponent={ExpandMoreRounded}
        sx={tzSelectSx}
        value={timezone}
        variant='standard'
        onChange={handleChange}
      >
        {Object.keys(Timezones).map(zone => (
          <MenuItem key={zone} value={Timezones[zone]}>
            {Timezones[zone]}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

const tzSelectSx = {
  color: '#022888',
  fontSize: '12px',
  '& .MuiSvgIcon-root': { color: '#022888' },
}
