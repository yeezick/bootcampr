import './Availability.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Timezones, weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'
import { getUserAvailability } from 'utils/redux/slices/userSlice'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { IconButton } from '@mui/material'
import { Navigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
export const Availability: React.FC = (): JSX.Element => {
  let userAvailability = useSelector(getUserAvailability)
  const [days, setDays] = useState(userAvailability)
  const [timezone, setTimezone] = useState(Timezones.ET)

  useEffect(() => {
    setDays(userAvailability)
  }, [userAvailability])

  return (
    <div>
      <div className='availability-container'>
        <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
        <p>Set weekly availability</p>
        <hr />
        {Object.keys(weekdaysMap).map(day => (
          <DayAvailabilityInputBanner
            key={`${day}-banner`}
            day={day}
            days={days}
            setDays={setDays}
          />
        ))}
      </div>
      <div className='availability-container-role-profile-button'>
        <div>
          <IconButton
            aria-label='go back to view profile'
            className='availability-container-back-button'
            // onClick={() => Navigate(`/users/${userId}`)}
          >
            <ArrowBackIcon />
            <p>Role</p>
          </IconButton>
        </div>
        <div>
          <button className='availability-container-profile-button'>
            Set up profile
            <ArrowForwardIcon className='availability-container-profile-button-arrow' />
          </button>
        </div>
      </div>
    </div>
  )
}
