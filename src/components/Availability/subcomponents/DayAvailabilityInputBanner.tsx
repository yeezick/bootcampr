import { Checkbox } from '@mui/material'
import { TimeSlotInput } from './TimeslotInput'
import { handleCheck } from '../utils/helpers'
import { useSelector } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
export const DayAvailabilityInputBanner = ({ day, days, setDays }) => {
  const authUser = useAppSelector(selectAuthUser)

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

const checkBoxStyle = {
  color: '#022888',
  '&.Mui-checked': { color: '#022888' },
}
