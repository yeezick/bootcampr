import './Availability.scss'
import { useState, useEffect } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'
import { useSelector } from 'react-redux'
import { getUserAvailability } from 'utils/redux/slices/userSlice'
import { consolidateAvailability } from './subcomponents/SelectTimeInput'

export const Availability: React.FC = (): JSX.Element => {
  let userAvailability = useSelector(getUserAvailability)
  // const availabilityForm = consolidateAvailability(userAvailability)
  const [days, setDays] = useState(userAvailability)
  const [timezone, setTimezone] = useState(Timezones.ET)
  // const [availability, setAvailability] = useState(userAvailability)

  useEffect(() => {
    console.log('new user availability')
    console.log(userAvailability)
    console.log(consolidateAvailability(userAvailability))
    setDays(userAvailability)
  }, [userAvailability])

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
    </div>
  )
}
