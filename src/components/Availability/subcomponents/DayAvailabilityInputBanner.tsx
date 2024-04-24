import { Checkbox } from '@mui/material'
import { TimeSlotInput } from './TimeslotInput'
import { handleCheck } from '../utils/helpers'
import { useEffect, useState } from 'react'
import { defaultAvailability } from 'utils/data/userConstants'
import { AvailabilityInterface } from 'interfaces'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserAvailability } from 'utils/redux/slices/userSlice'

export const DayAvailabilityInputBanner = ({ day, idx, days, setDays }) => {
  useEffect(() => {
    console.log(days)
    // Set in redux here?
    // Also ensure that if a user already has availability stored, that should be used instead
  }, [days])

  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <div className='check-day'>
            <Checkbox
              name={day}
              onChange={() => handleCheck(day, days, setDays)}
              sx={checkBoxStyle}
              checked={days[day].available}
            />
            <h2>{day}</h2>
          </div>
          {days[day]['available'] ? (
            <TimeSlotInput day={day} days={days} setDays={setDays} />
          ) : (
            <h2 className='unavailable'>Unavailable</h2>
          )}
        </div>
      </div>
      {day !== 'SAT' && <hr />}
    </div>
  )
}

const checkBoxStyle = {
  color: 'black',
  '&.Mui-checked': { color: '#022888' },
}
