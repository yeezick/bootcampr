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
      <div className='availability-container'>
        <div>
          <IconButton
            aria-label='go back to view profile'
            className='editprofile__backBtn'
            // onClick={() => Navigate(`/users/${userId}`)}
          >
            <ArrowBackIcon />
            <p>Role</p>
          </IconButton>
        </div>
        <div>
          <button>Set up profile</button>
        </div>
      </div>
    </div>
  )
}
