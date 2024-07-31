import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectTimeline } from 'utils/redux/slices/projectSlice'
import { CustomRecurrenceModal } from './CustomRecurrenceModal'
import { useSelector } from 'react-redux'
import { selectUserId } from 'utils/redux/slices/userSlice'
import {
  createCustomRecurrence,
  fetchCustomRecurrences,
} from 'utils/api/customRecurrences'
import {
  addCustomRecurrence,
  setCustomRecurrences,
  setRecurrence,
} from 'utils/redux/slices/recurrenceSlice'
import { RootState } from 'utils/redux/rootReducer'
import { generateDayJs, matchRRuleToOption, sortWeekdays } from 'utils/helpers'
import { selectDisplayedEvent } from 'utils/redux/slices/calendarSlice'

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
  const dispatch = useAppDispatch()
  const recurrence = useSelector(
    (state: RootState) => state.recurrence.recurrence
  )
  const customRecurrences = useSelector(
    (state: RootState) => state.recurrence.customRecurrences
  )
  const { endDate } = useAppSelector(selectProjectTimeline)
  const userId = useAppSelector(selectUserId)

  const [openModal, setOpenModal] = useState(false)
  const [customDays, setCustomDays] = useState<string[]>([])

  const formattedED = generateDayJs(endDate).add(1, 'day').format('YYYYMMDD')
  const dayOfTheWeek = daysOfWeek[generateDayJs(date).day()]
  const recurrenceOptions = [
    { value: 'one-time', label: 'One-time meeting' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: `Weekly on ${dayOfTheWeek}` },
    { value: 'weekdays', label: 'Every weekday (Monday-Friday)' },
    { value: 'custom', label: 'Custom' },
  ]
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  // Effect to fetch custom recurrences and set initial recurrence option
  useEffect(() => {
    const fetchRecurrences = async () => {
      if (userId) {
        try {
          const response = await fetchCustomRecurrences(userId)
          dispatch(setCustomRecurrences(response.data))
        } catch (error) {
          console.error('Failed to fetch custom recurrences', error)
        }
      }
    }
    fetchRecurrences()

    // Match RRULE to an option
    if (displayedEvent && displayedEvent.rrule) {
      const matchedOption = matchRRuleToOption(displayedEvent.rrule)
      dispatch(setRecurrence(matchedOption))
    } else {
      dispatch(setRecurrence(recurrenceOptions[0].value))
    }
  }, [userId])

  // Effect to handle changes in recurrence and custom days
  useEffect(() => {
    if (recurrence.startsWith('Weekly on')) {
      const customRecurrence = customRecurrences.find(
        cr => cr.recurrenceLabel === recurrence
      )
      if (customRecurrence) {
        setCustomDays(customRecurrence.daysOfWeek)
        onRecurrenceChange(
          generateRRule('custom', customRecurrence.daysOfWeek, formattedED)
        )
      }
    } else {
      onRecurrenceChange(generateRRule(recurrence, [], formattedED))
    }
  }, [recurrence, formattedED, customDays, onRecurrenceChange])

  // Handler for recurrence select change
  const handleRecurrenceChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    if (value === 'Custom') {
      setOpenModal(true)
    } else {
      dispatch(setRecurrence(value))
      setCustomDays([])
    }
  }

  // Handler for saving custom recurrence
  const handleSaveCustomRecurrence = async (selectedDays: string[]) => {
    const sortedSelectedDays = sortWeekdays(selectedDays)
    const customLabel = `Weekly on ${sortedSelectedDays.join(', ')}`
    const newCustomRecurrence = {
      recurrenceLabel: customLabel,
      daysOfWeek: sortedSelectedDays,
      userId,
    }
    try {
      await createCustomRecurrence(newCustomRecurrence)
      dispatch(addCustomRecurrence(newCustomRecurrence))
      dispatch(setRecurrence(customLabel))
      setCustomDays(selectedDays)
    } catch (error) {
      console.error('Failed to save custom recurrence.')
    }
    setOpenModal(false)
  }

  return (
    <>
      <FormControl fullWidth>
        <Select
          id='recurrence-select'
          value={recurrence}
          onChange={handleRecurrenceChange}
          sx={recurrencesSelectStyles}
        >
          {recurrenceOptions.slice(0, -1).map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          {customRecurrences.map(custom => (
            <MenuItem
              key={custom.recurrenceLabel}
              value={custom.recurrenceLabel}
            >
              {custom.recurrenceLabel}
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

// Function to generate RRule based on recurrence type
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

const recurrencesSelectStyles = {
  color: 'black',
  borderRadius: '5px',
  padding: '5px',
  fontSize: '14px',
  width: '320px',
  height: '40px',

  '& .MuiSelect-select.MuiInputBase-input': {
    paddingRight: '0px',
  },
  '&:hover': {
    cursor: 'pointer',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1.5px solid black',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
}
