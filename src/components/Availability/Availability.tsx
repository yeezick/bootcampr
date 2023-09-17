import { useState, useEffect } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import { getUserAvailability } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
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
