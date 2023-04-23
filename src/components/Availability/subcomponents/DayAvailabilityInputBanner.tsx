import { useState } from 'react'
import { Checkbox } from '@mui/material'
import { defaultAvailabilityForm } from '../utils/data'
import { TimeSlotInput } from './TimeslotInput'

export const DayAvailabilityInputBanner = ({ day }) => {
  const [days, setDays] = useState(defaultAvailabilityForm)

  const handleCheck = e => {
    setDays({
      ...days,
      [e.target.name]: {
        available: !days[e.target.name].available,
        availability: [...days[e.target.name].availability],
      },
    })
  }

  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <div className='check-day'>
            <Checkbox
              name={day}
              onChange={e => handleCheck(e)}
              sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
              checked={days[day].available}
            />
            <h2>{day}</h2>
          </div>
          {days[day]['available'] ? (
            <TimeSlotInput
              day={day}
              days={days}
              setDays={setDays}
              slots={days[day].availability}
            />
          ) : (
            <h2>Unavailable</h2>
          )}
        </div>
      </div>
      <hr />
    </div>
  )
}
