import { useEffect } from 'react'
import { weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import { selectUserAvailability } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import './Availability.scss'

export const Availability = ({ days, setDays }): JSX.Element => {
  const userAvailability = useAppSelector(selectUserAvailability)

  useEffect(() => {
    setDays(userAvailability)
  }, [userAvailability])

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner />
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
