import { useEffect, useState } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import {
  selectUserAvailability,
  getUserTimezone,
} from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import './Availability.scss'
import { utcToBootcamprTimezoneMap } from 'utils/data/timeZoneConstants'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'
import { setUserTimezone } from 'utils/redux/slices/userSlice'

export const Availability = ({ days, setDays }): JSX.Element => {
  const userAvailability = useAppSelector(selectUserAvailability)
  const storedUserTimezone = useAppSelector(getUserTimezone)
  const [userFriendlyTimezone, setUserFriendlyTimezone] = useState(Timezones.ET)

  useEffect(() => {
    setDays(userAvailability)
  }, [userAvailability])

  useEffect(() => {
    const guessedUserTimezone = guessUserTimezone()
    let timezone

    if (storedUserTimezone) {
      timezone = utcToBootcamprTimezoneMap[storedUserTimezone]
      setUserFriendlyTimezone(timezone)
    } else if (guessedUserTimezone) {
      timezone = guessedUserTimezone.userFriendlyTZ
      setUserFriendlyTimezone(guessedUserTimezone.userFriendlyTZ)
    }
    setUserTimezone(timezone)
  }, [])

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner
        timezone={userFriendlyTimezone}
        setTimezone={setUserFriendlyTimezone}
      />
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
