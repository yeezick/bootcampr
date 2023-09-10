import './Availability.scss'
import { useState, useEffect } from 'react'
import { weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'
import {
  getUserAvailability,
  selectAuthUser,
} from 'utils/redux/slices/userSlice'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import moment from 'moment-timezone'
import { updateUser } from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'
import { updateAvailability } from 'utils/api'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const Availability: React.FC = ({
  handlePageNavigation,
}: any): JSX.Element => {
  const authUser = useAppSelector(selectAuthUser)
  let userAvailability = useAppSelector(getUserAvailability)
  const [days, setDays] = useState(userAvailability)
  const [timezone, setTimezone] = useState(getCurrentTimeZone())
  const dispatch = useDispatch()

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

  const handleSave = async () => {
    const updated = await updateAvailability(authUser._id, days)
    if (updated.status) {
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Your availability has been updated!',
          duration: 3000,
          severity: 'success',
        })
      )
    } else {
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Something went wrong please try again',
          duration: 3000,
          severity: 'error',
        })
      )
    }
  }
  return (
    <div className='availability-container'>
      {/* slajhdlasjdhalsjhd */}
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
              onClick={() => handlePageNavigation('previous')}
              aria-label='go back to view profile'
              className='availability-container-back-button'
            >
              <ArrowBackIcon />
              <p>Role</p>
            </IconButton>
          </div>
          <div>
            <button
              className='availability-container-profile-button'
              onClick={() => handlePageNavigation('next')}
            >
              Set up profile
              <ArrowForwardIcon className='availability-container-profile-button-arrow' />
            </button>
          </div>
        </div>
        {/* lsjadhlajsdhalsj */}
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
        <button onClick={handleSave}>save</button>
      </div>
    </div>
  )
}
