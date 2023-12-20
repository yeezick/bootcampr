import { useEffect } from 'react'
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

export const Availability = ({
  days,
  setDays,
  uxUserTimezone,
  setUxUserTimezone,
}): JSX.Element => {
  const userAvailability = useAppSelector(selectUserAvailability)
  const storedUserTimezone = useAppSelector(getUserTimezone)

  useEffect(() => {
    setDays(userAvailability)
    const userFriendlyTimezone =
      utcToBootcamprTimezoneMap[storedUserTimezone] || Timezones.ET
    setUxUserTimezone(userFriendlyTimezone)
  }, [])

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner
        timezone={uxUserTimezone}
        setTimezone={setUxUserTimezone}
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
