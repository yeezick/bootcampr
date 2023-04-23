import { useState } from 'react'
import { Checkbox } from '@mui/material'
import { TimeSlotInput } from './TimeslotInput'
import { defaultAvailabilityForm } from '../utils/data'

export const DayAvailabilityInputBanner = ({ day }) => {
  const [days, setDays] = useState(defaultAvailabilityForm)

  const handleCheck = e => {
    const available = !days[e.target.name].available
    const availability = [...days[e.target.name].availability]
    const dayToChange = e.target.name

    setDays({
      ...days,
      [dayToChange]: {
        available,
        availability,
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
