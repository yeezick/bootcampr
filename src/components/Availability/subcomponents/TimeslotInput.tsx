import {
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import { SelectTimeInput } from './SelectTimeInput'
import { timeOptions } from '../utils/data'

export const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const handleHover = (idx, display, action) => {
    console.log(
      `Add hover placeholder for ${day}, timeslot ${
        idx + 1
      }, display: ${display}, action: ${action}`
    )
  }

  const getNextTimeslot = currentTime => {
    const index = timeOptions.indexOf(currentTime)
    return [timeOptions[index + 1], timeOptions[index + 2]]
  }

  const deleteTimeSlot = (day, idx) => {
    console.log(idx)
    let newAvailability
    if (days[day].availability.length === 1) {
      newAvailability = {
        available: false,
        availability: [['9:00 AM', '5:00 PM']],
      }
    } else {
      newAvailability = {
        available: true,
        availability: days[day].availability,
      }
      newAvailability.availability.splice(idx, 1)
    }
    console.log(`delete timeslot for ${day} ${idx}`)

    console.log(newAvailability)

    setDays({
      ...days,
      [day]: {
        ...newAvailability,
      },
    })
  }

  const addTimeSlot = (day, idx) => {
    const nextTimeslot = getNextTimeslot(days[day].availability[idx][1])
    days[day].availability.push(nextTimeslot)

    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: days[day].availability,
      },
    })
  }

  const handleIconClick = (icon, day, idx) => {
    console.log(`clicked on ${icon}, for ${day}, index: ${idx}`)
    switch (icon) {
      case 'add':
        addTimeSlot(day, idx)
        break
      case 'delete':
        deleteTimeSlot(day, idx)
        break
      default:
        break
    }
  }

  return (
    <div className='timeslots-container'>
      {slots.map((slot, idx) => (
        <div key={`${slot}-${idx}`} className='timeslot-input'>
          <div className='left-banner'>
            <SelectTimeInput
              isStart={true}
              idx={idx}
              slot={slot}
              day={day}
              days={days}
              setDays={setDays}
            />
            <h4>--</h4>
            <SelectTimeInput
              isStart={false}
              day={day}
              idx={idx}
              slot={slot}
              days={days}
              setDays={setDays}
            />
            <DeleteOutline
              className='icon'
              onClick={() => handleIconClick('delete', day, idx)}
            />
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <div className='hover-icon'>
                <AddRounded
                  onMouseEnter={() => handleHover(idx, 'show', 'add')}
                  onMouseOut={() => handleHover(idx, 'hide', 'add')}
                  onClick={() => handleIconClick('add', day, idx)}
                />
              </div>
            )}
            <div className='hover-icon'>
              <ContentCopyOutlined
                onMouseEnter={() => handleHover(idx, 'show', 'copy')}
                onMouseOut={() => handleHover(idx, 'hide', 'copy')}
                onClick={() => handleIconClick('copy', day, idx)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
