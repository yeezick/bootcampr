import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  FormGroup,
  FormControlLabel,
} from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProjectTimeline } from 'utils/redux/slices/projectSlice'

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const SelectRecurrence = ({ onRecurrenceChange, date }) => {
  const [recurrence, setRecurrence] = useState<string>('')
  const [customDays, setCustomDays] = useState<string[]>([])
  const { endDate } = useAppSelector(selectProjectTimeline)
  const formattedED = dayjs(endDate).format('YYYYMMDD')

  const dayOfTheWeek = daysOfWeek[dayjs(date).day()]

  const handleRecurrenceChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    setRecurrence(value)
    if (value !== 'custom') {
      setCustomDays([])
    }
    onRecurrenceChange(generateRRule(value, customDays, formattedED))
  }

  const handleCustomDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.name
    setCustomDays(prev =>
      prev.includes(value)
        ? prev.filter(day => day !== value)
        : [...prev, value]
    )
    onRecurrenceChange(generateRRule(recurrence, customDays, formattedED))
  }

  //console.log(customDays, recurrence, recurrenceRule)

  return (
    <FormControl fullWidth>
      <InputLabel id='recurrence-label'>Recurrence</InputLabel>
      <Select
        labelId='recurrence-label'
        id='recurrence-select'
        value={recurrence}
        label='Recurrence'
        onChange={handleRecurrenceChange}
      >
        <MenuItem value='one-time'>One-time meeting</MenuItem>
        <MenuItem value='daily'>Daily</MenuItem>
        <MenuItem value='weekly'>Weekly on {dayOfTheWeek}</MenuItem>
        <MenuItem value='weekdays'>Everyday (Monday-Friday)</MenuItem>
        <MenuItem value='custom'>Custom</MenuItem>
      </Select>
      {recurrence === 'custom' && (
        <FormGroup>
          {daysOfWeek.map(day => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={customDays.includes(day)}
                  onChange={handleCustomDaysChange}
                  name={day}
                />
              }
              label={day}
            />
          ))}
        </FormGroup>
      )}
    </FormControl>
  )
}

const generateRRule = (
  recurrence: string,
  customDays: string[],
  endDate: string
): string | null => {
  const dayMapping = {
    Sunday: 'SU',
    Monday: 'MO',
    Tuesday: 'TU',
    Wednesday: 'WE',
    Thursday: 'TH',
    Friday: 'FR',
    Saturday: 'SA',
  }

  switch (recurrence) {
    case 'daily':
      return `RRULE:FREQ=DAILY;UNTIL=${endDate}`
    case 'weekly':
      return `RRULE:FREQ=WEEKLY;UNTIL=${endDate}`
    case 'weekdays':
      return `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;UNTIL=${endDate}`
    case 'custom':
      if (customDays.length > 0) {
        const byDay = customDays.map(day => dayMapping[day]).join(',')
        return `RRULE:FREQ=WEEKLY;BYDAY=${byDay};UNTIL=${endDate}`
      }
      return null
    case 'one-time':
    default:
      return null
  }
}
