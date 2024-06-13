import { weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import './Availability.scss'
import { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserAvailability } from 'utils/redux/slices/userSlice'

export const Availability = ({ context }) => {
  const storedUserAvailability = useAppSelector(selectUserAvailability)
  const [days, setDays] = useState(storedUserAvailability)

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner context={context} />
      {context === 'onboarding' ? (
        <p>Set weekly availability</p>
      ) : (
        <p className='availability-requirement'>
          *You must have 3 days per week with at least 1 hour per day of
          availability to meet.
        </p>
      )}
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
