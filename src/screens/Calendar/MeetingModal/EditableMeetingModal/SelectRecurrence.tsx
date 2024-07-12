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
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectTimeline } from 'utils/redux/slices/projectSlice'
import { CustomRecurrenceModal } from './CustomRecurrenceModal'
import { api } from 'utils/api/apiConfig'
import { useSelector } from 'react-redux'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { fetchCustomRecurrences } from 'utils/api/customRecurrences'

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
  const [openModal, setOpenModal] = useState(false)
  const [customDays, setCustomDays] = useState<string[]>([])
  const { endDate } = useAppSelector(selectProjectTimeline)
  const formattedED = dayjs(endDate).add(1, 'day').format('YYYYMMDD')
  const dayOfTheWeek = daysOfWeek[dayjs(date).day()]
  const recurrenceOptions = [
    { value: 'one-time', label: 'One-time meeting' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: `Weekly on ${dayOfTheWeek}` },
    { value: 'weekdays', label: 'Every weekday (Monday-Friday)' },
    { value: 'custom', label: 'Custom' },
  ]
  const [customRecurrences, setCustomRecurrences] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserId)

  // const getCustomRecurrences = async userId => {
  //   const customRecurrencess = await fetchCustomRecurrences(userId);

  // }

  useEffect(() => {
    const fetchRecurrences = async () => {
      const customRecurrencess = await fetchCustomRecurrences(userId)
      setCustomRecurrences(customRecurrencess.map(r => r.recurrenceLabel))
    }
    if (userId) {
      fetchRecurrences()
    }
  }, [userId])

  const handleRecurrenceChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    if (value === 'Custom') {
      setOpenModal(true)
    } else {
      setRecurrence(value)
      onRecurrenceChange(generateRRule(value, customDays, formattedED))
    }
  }

  const handleSaveCustomRecurrence = (selectedDays: string[]) => {
    const customLabel = `Weekly on ${selectedDays.join(', ')}`
    try {
      const res = api.post('/customRecurrence', {
        userId,
        recurrenceLabel: customLabel,
        daysOfWeek: selectedDays,
      })
      console.log(res)
      setCustomRecurrences(prev => [...prev, customLabel])
      setRecurrence(customLabel)
      onRecurrenceChange(generateRRule('custom', selectedDays, formattedED))
    } catch (error) {
      console.error('Failed to save custom recurrence.')
    }
    setOpenModal(false)
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id='recurrence-label'>Recurrence</InputLabel>
        <Select
          labelId='recurrence-label'
          id='recurrence-select'
          value={recurrence}
          label='Recurrence'
          onChange={handleRecurrenceChange}
        >
          {recurrenceOptions.slice(0, -1).map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          {customRecurrences.map(custom => (
            <MenuItem key={custom} value={custom}>
              {custom}
            </MenuItem>
          ))}
          <MenuItem value='Custom'>Custom</MenuItem>
        </Select>
      </FormControl>
      <CustomRecurrenceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveCustomRecurrence}
        daysOfWeek={daysOfWeek}
      />
    </>
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
