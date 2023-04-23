import {
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import { SelectTimeInput } from './SelectTimeInput'

export const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const handleHover = (idx, display, action) => {
    console.log(
      `Add hover placeholder for ${day}, timeslot ${
        idx + 1
      }, display: ${display}, action: ${action}`
    )
  }

  const handleIconClick = (icon, day, idx) => {
    console.log(`clicked on ${icon}, for ${day}, index: ${idx}`)
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
