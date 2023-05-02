import './Availability.scss'
import { useState, useEffect } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'
import { useSelector } from 'react-redux'
import { getUserAvailability } from 'utils/redux/slices/userSlice'

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.ET)
  const userAvailability = useSelector(getUserAvailability)
  const [availability, setAvailability] = useState(userAvailability)

  useEffect(() => {
    console.log('user availability')
    console.log(userAvailability)
    console.log('availability')
    console.log(availability)
  }, [availability])

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map(day => (
        <DayAvailabilityInputBanner key={`${day}-banner`} day={day} />
      ))}
    </div>
  )
}
