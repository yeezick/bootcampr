import { useEffect } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import {
  getUserAvailability,
  getUserTimezone,
} from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import './Availability.scss'
import dayjs from 'dayjs'
import {
  UTCtoBootcamprTimezoneMap,
  UserFriendlyTimezones,
  restructuredData,
} from 'utils/data/timeZoneConstants'

export const Availability = ({
  days,
  setDays,
  userTimezone,
  setUserTimezone,
}): JSX.Element => {
  const userAvailability = useAppSelector(getUserAvailability)
  const storedUserTimezone = useAppSelector(getUserTimezone)

  useEffect(() => {
    setDays(userAvailability)
    const userFriendlyTimezone =
      UTCtoBootcamprTimezoneMap[storedUserTimezone] || Timezones.ET
    setUserTimezone(userFriendlyTimezone)

    // make function for conversion?
    // Check if
    const userFriendlyTZ = guessUserTimezone()
    // TODO: ensure that if a user has timezone stored already, that is what populates.
    // If what they have stored is different from our guess, provide a space to ask them
    // if they want to chagne timezone
  }, [])

  return (
    <div className='availability-container'>
      {/* TODO: have separate setters for userfriendly timezone, and user stored timezone (UTC) */}
      <TimeZoneInputBanner
        timezone={userTimezone}
        setTimezone={setUserTimezone}
      />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map(day => (
        <DayAvailabilityInputBanner
          day={day}
          days={days}
          key={`${day}-banner`}
          setDays={setDays}
          timezone={storedUserTimezone}
        />
      ))}
    </div>
  )
}

const guessUserTimezone = (): UserFriendlyTimezones => {
  const userTZ = dayjs.tz.guess()
  const utc = restructuredData[userTZ].utc
  const userFriendlyTZ = UTCtoBootcamprTimezoneMap[utc]

  return userFriendlyTZ
}
