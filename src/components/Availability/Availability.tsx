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
import { utcToBootcamprTimezoneMap } from 'utils/data/timeZoneConstants'

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
      utcToBootcamprTimezoneMap[storedUserTimezone] || Timezones.ET
    setUserTimezone(userFriendlyTimezone)
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
          // timezone={storedUserTimezone}
        />
      ))}
    </div>
  )
}
