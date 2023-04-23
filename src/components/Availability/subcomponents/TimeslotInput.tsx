import { MenuItem, Select } from '@mui/material'
import {
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import { subOptions } from '../utils/helpers'

export const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const handleTimeChange = e => {
    const context = e.target.name.split('-')
    const day = context[0]
    const frame = Number(context[1])
    const index = context[2] === 'start' ? 0 : 1
    let newAvailability = days[day].availability
    newAvailability[frame][index] = e.target.value

    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: newAvailability,
      },
    })
  }

  const SelectTimeInput = ({ isStart, day, idx, slot, days }) => {
    const index = isStart ? 0 : 1
    return (
      <Select
        name={`${day}-${idx}-start`}
        onChange={e => handleTimeChange(e)}
        size='small'
        defaultValue={slot[index]}
        value={days[day].availability[idx][index]}
        inputProps={{ sx: { padding: '8px 13px !important' } }}
        sx={{
          padding: '0 !important',
          fontSize: '14px',
          '& .MuiSvgIcon-root': { display: 'none' },
          backgroundColor: '#fefefe',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          width: '87px',
          fieldset: {
            border: 'none !important',
            outline: 'none !important',
          },
          elevation: '0',
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 160,
              boxShadow: 0,
              width: 130,
              marginLeft: 2.5,
              marginTop: 0.5,
            },
          },
        }}
      >
        {subOptions(slot[0], isStart, idx).map(time => (
          <MenuItem value={time}>{time}</MenuItem>
        ))}
      </Select>
    )
  }

  return (
    <div className='timeslots-container'>
      {slots.map((slot, idx) => (
        <div className='timeslot-input'>
          <div className='left-banner'>
            <SelectTimeInput
              isStart={true}
              day={day}
              idx={idx}
              slot={slot}
              days={days}
            />
            <h4>--</h4>
            <SelectTimeInput
              isStart={false}
              day={day}
              idx={idx}
              slot={slot}
              days={days}
            />
            <DeleteOutline
              className='icon'
              onClick={() =>
                console.log(
                  `Delete placeholder for ${day}, timeslot ${idx + 1}`
                )
              }
            />
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <div>
                <AddRounded
                  onMouseEnter={() =>
                    console.log(
                      `Show Hover Message placeholder for ${day} timeslot ${
                        idx + 1
                      }: add timeslot`
                    )
                  }
                  onMouseOut={() =>
                    console.log(
                      `Hide Hover Message placeholder for ${day} timeslot ${
                        idx + 1
                      }`
                    )
                  }
                  onClick={e =>
                    console.log(`Add timeslot placeholder for ${day}`)
                  }
                />
              </div>
            )}
            {/* this has to move to a div bc the icon onMouse is weird */}
            <ContentCopyOutlined
              onMouseEnter={() =>
                console.log(
                  `Show Hover Message placeholder for ${day} timeslot ${
                    idx + 1
                  }: copy timeslot`
                )
              }
              onMouseOut={() =>
                console.log(
                  `Hide Hover Message placeholder for ${day} timeslot ${
                    idx + 1
                  }: copy timeslot`
                )
              }
              onClick={e =>
                console.log(
                  `Copy timeslot placeholder for ${day} timeslot: ${idx + 1}`
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}
