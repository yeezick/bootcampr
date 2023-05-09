import { MenuItem, Select } from '@mui/material'
import { timeOptions } from '../utils/data'

export const consolidateAvailability = availability => {
  for (let i = 1; i < availability.length; i++) {
    const timeA = availability[i][0]
    const timeB = availability[i - 1][1]
    if (timeOptions.indexOf(timeA) <= timeOptions.indexOf(timeB)) {
      // check if the later of the two times is also greater
      availability[i - 1] = [availability[i - 1][0], availability[i][1]]
      availability.splice(i, 1)
    }
  }
  return availability
}

export const SelectTimeInput = ({ isStart, day, idx, slot, days, setDays }) => {
  const index = isStart ? 0 : 1

  const handleTimeChange = e => {
    const context = e.target.name.split('-')
    const day = context[0]
    const frame = Number(context[1])
    const index = context[2]
    console.log('day-frame-index')
    console.log(context)

    const newTime = [...days[day].availability[frame]]
    newTime[index] = e.target.value

    let newAvailability = [...days[day].availability]
    newAvailability[frame] = newTime

    newAvailability = consolidateAvailability(newAvailability)

    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: newAvailability,
      },
    })
  }

  return (
    <Select
      defaultValue={slot[index]}
      inputProps={{ sx: { padding: '8px 13px !important' } }}
      MenuProps={menuPropsSX}
      name={`${day}-${idx}-${index}`}
      onChange={e => handleTimeChange(e)}
      size='small'
      sx={selectSX}
      value={days[day].availability[idx][index]}
    >
      {timeOptions.map(time => (
        <MenuItem key={`option-${time}`} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  )
}

const selectSX = {
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
}

const menuPropsSX = {
  PaperProps: {
    sx: {
      boxShadow: 0,
      marginLeft: 2.5,
      marginTop: 0.5,
      maxHeight: 160,
      width: 130,
    },
  },
}
