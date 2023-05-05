import { useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'
import { TimeSlotInput } from './TimeslotInput'
import { defaultAvailabilityForm } from '../utils/data'
import { useSelector } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { useDispatch } from 'react-redux'
import {
  getUserAvailability,
  setUserAvailability,
} from 'utils/redux/slices/userSlice'
import { consolidateAvailability } from './SelectTimeInput'

export const DayAvailabilityInputBanner = ({ day, days, setDays }) => {
  //   make a sep. namespace for avail?
  const dispatch = useDispatch()

  const handleCheck = e => {
    // default should NOT be 9-5
    // bc using copy paste time, then auto populates 9-5 as well as the copied time
    // default should be an empty array
    // if check to available, and array is empty, add 9-5
    // if array is not empty, maintain array state
    const available = !days[e.target.name].available
    const newAvailability =
      days[e.target.name].availability.length > 0
        ? days[e.target.name].availability
        : [['9:00 AM', '5:00 PM']]
    const availability = [...days[e.target.name].availability]
    // this is redundant?
    const dayToChange = day

    setDays({
      ...days,
      [dayToChange]: {
        available,
        availability: newAvailability,
      },
    })
    // dispatch(setUserAvailability(days))
  }

  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <div className='check-day'>
            <Checkbox
              name={day}
              onChange={handleCheck}
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
