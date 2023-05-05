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
  // let userAvailability = useSelector(getUserAvailability)
  // const availabilityForm = consolidateAvailability(userAvailability)
  // const [days, setDays] = useState(availabilityForm)
  //   make a sep. namespace for avail?
  const dispatch = useDispatch()

  // useEffect(() => {
  //   console.log('new user availability')
  //   setDays(userAvailability)
  // }, [userAvailability])

  const handleCheck = e => {
    const available = !days[e.target.name].available
    const availability = [...days[e.target.name].availability]
    const dayToChange = day

    setDays({
      ...days,
      [dayToChange]: {
        available,
        availability,
      },
    })
    dispatch(setUserAvailability(days))
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
