import './Availability.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Timezones, weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'
import {
  getUserAvailability,
  selectAuthUser,
} from 'utils/redux/slices/userSlice'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import moment from 'moment-timezone'
import { updateUser } from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'

export const Availability: React.FC = (): JSX.Element => {
  const authUser = useAppSelector(selectAuthUser)
  let userAvailability = useSelector(getUserAvailability)
  const [days, setDays] = useState(userAvailability)
  const [timezone, setTimezone] = useState(getCurrentTimeZone())
  const navigate = useNavigate()
  useEffect(() => {
    setDays(userAvailability)
  }, [userAvailability])

  function getCurrentTimeZone() {
    const currentDateArray = moment().toArray()
    const userTimeZone = moment.tz.guess()
    let timeZone = moment
      .tz(currentDateArray.slice(0, 2), userTimeZone)
      .format('z')
    return timeZone
  }

  const addUserAvailability = async () => {
    await updateUser(authUser._id, { availability: days })
  }

  const navigateToRoles = () => {
    navigate(`/users/${authUser?._id}`)
  }

  return (
    <div>
      <div className='availability-container'>
        <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
        <p>Set weekly availability</p>
        <button onClick={addUserAvailability}>submit availability </button>
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
            onClick={navigateToRoles}
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
