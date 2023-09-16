import { useState, useEffect } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import { getUserAvailability } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { updateAvailability } from 'utils/api'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import './Availability.scss'

export const Availability = ({ days, setDays }): JSX.Element => {
  const userAvailability = useAppSelector(getUserAvailability)
  const [timezone, setTimezone] = useState(Timezones.ET)

  useEffect(() => {
    setDays(userAvailability)
  }, [userAvailability])

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map((day, idx) => (
        <DayAvailabilityInputBanner
          day={day}
          days={days}
          idx={idx}
          key={`${day}-banner`}
          setDays={setDays}
        />
      ))}
    </div>
  )
}

export const saveAvailability = async (dispatch, userId, days) => {
  const updated = await updateAvailability(userId, days)
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
