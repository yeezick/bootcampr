import './Availability.scss'
import { useState, useEffect } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'
import { getUserAvailability } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { updateAvailability } from 'utils/api'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const Availability = ({ days, setDays }): JSX.Element => {
  const userAvailability = useAppSelector(getUserAvailability)
  const [timezone, setTimezone] = useState(Timezones.ET)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setDays(userAvailability)
  }, [userAvailability])

  const handleSaveAvailability = async () =>
    await saveAvailability(dispatch, authUser._id, days)

  return (
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
      <button onClick={handleSaveAvailability}>save</button>
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
