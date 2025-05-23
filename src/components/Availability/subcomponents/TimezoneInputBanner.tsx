import { MenuItem, Select } from '@mui/material'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Timezones } from '../utils/data'
import { setUserTimezone } from 'utils/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { collabifyTimezoneToUTCMap } from 'utils/data/timeZoneConstants'
import { utcToCollabifyTimezoneMap } from 'utils/data/timeZoneConstants'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone } from 'utils/redux/slices/userSlice'

export const TimeZoneInputBanner = ({ context }) => {
  const dispatch = useDispatch()
  const storedUserTimezone = useAppSelector(getUserTimezone)
  const [userFriendlyTimezone, setUserFriendlyTimezone] = useState(Timezones.ET)

  useEffect(() => {
    const guessedUserTimezone = guessUserTimezone()
    let timezone

    if (storedUserTimezone) {
      timezone = utcToCollabifyTimezoneMap[storedUserTimezone]
      setUserFriendlyTimezone(timezone)
    } else if (guessedUserTimezone) {
      timezone = guessedUserTimezone.userFriendly
      setUserFriendlyTimezone(guessedUserTimezone.userFriendly)
      dispatch(setUserTimezone(guessedUserTimezone.utc))
    }
  }, [])

  const handleChange = e => {
    const timezoneValue = e.target.value
    const userTZinUTC = collabifyTimezoneToUTCMap[timezoneValue]

    setUserFriendlyTimezone(timezoneValue)
    dispatch(setUserTimezone(userTZinUTC))
  }

  return (
    <div className='timezone-input-container'>
      {context === 'onboarding' ? (
        <h2>Availability</h2>
      ) : (
        <h2>Update Availability</h2>
      )}
      <Select
        defaultValue={userFriendlyTimezone}
        IconComponent={ExpandMoreRounded}
        sx={tzSelectSx}
        value={userFriendlyTimezone}
        onChange={handleChange}
        className='timezone-input'
        inputProps={{ MenuProps: { disableScrollLock: true } }}
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
  backgroundColor: 'white',
  borderColor: 'black',
  color: 'black',
  fontSize: '14px',
  height: '35px',
  width: '300px',
  '& .MuiSvgIcon-root': { color: 'black' },
}
