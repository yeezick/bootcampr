import './Availability.scss'
import { useState } from 'react'
import { Timezones, weekdaysMap } from './utils/data'
import { DayAvailabilityInputBanner } from './subcomponents/DayAvailabilityInputBanner'
import { TimeZoneInputBanner } from './subcomponents/TimezoneInputBanner'

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.ET)

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map(day => (
        <DayAvailabilityInputBanner day={day} />
      ))}
    </div>
  )
}
