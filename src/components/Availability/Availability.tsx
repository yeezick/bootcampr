import { weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import './Availability.scss'
import { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserAvailability } from 'utils/redux/slices/userSlice'

export const Availability = (): JSX.Element => {
  const storedUserAvailability = useAppSelector(selectUserAvailability)
  const [days, setDays] = useState(storedUserAvailability)

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
