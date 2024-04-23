import { weekdaysMap } from './utils/data'
import {
  DayAvailabilityInputBanner,
  TimeZoneInputBanner,
} from './subcomponents'
import './Availability.scss'

export const Availability = (): JSX.Element => {
  return (
    <div className='availability-container'>
      <TimeZoneInputBanner />
      <p>Set weekly availability</p>
      <hr />
      {Object.keys(weekdaysMap).map((day, idx) => (
        <DayAvailabilityInputBanner day={day} idx={idx} key={`${day}-banner`} />
      ))}
    </div>
  )
}
