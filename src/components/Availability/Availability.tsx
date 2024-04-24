import { weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import './Availability.scss'
import { useState } from 'react'
import { defaultAvailability } from 'utils/data/userConstants'

export const Availability = (): JSX.Element => {
  const [days, setDays] = useState(defaultAvailability)

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map(day => (
        <DayAvailabilityInputBanner
          day={day}
          days={days}
          setDays={setDays}
          key={`${day}-banner`}
        />
      ))}
    </div>
  )
}
