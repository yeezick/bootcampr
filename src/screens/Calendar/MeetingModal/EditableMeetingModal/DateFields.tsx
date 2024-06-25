import { AccessTime } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import {
  updateDateInTimeSelections,
  blankDayJs,
  generateDayJs,
} from 'utils/helpers'
import { SelectTimeZone } from './SelectTimeZone'
import { selectProjectTimeline } from 'utils/redux/slices/projectSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { SelectTime } from './SelectTime'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import '../styles/DisplayMeetingModal.scss'
import '../styles/Datefields.scss'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { RecurringDays } from './RecurringDays'
import { RecurringCheckbox } from './RecurringCheckbox'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)

export const DateFields = ({
  dateFields,
  dayjs,
  setDateFields,
  days,
  setDays,
  handleSelect,
  recurrenceInfo,
  setRecurrenceInfo,
}) => {
  const [datePickerDayjs, setDayPickerDayjs] = useState(
    generateDayJs(dateFields.date)
  )
  const { startDate, endDate } = useAppSelector(selectProjectTimeline)

  const handleDate = newDate => {
    const updatedDateFields = {
      ...dateFields,
      date: newDate.toISOString(),
      end: updateDateInTimeSelections(newDate, dateFields.end),
      start: updateDateInTimeSelections(newDate, dateFields.start),
    }
    setDateFields(updatedDateFields)
    setDayPickerDayjs(newDate)
  }

  useEffect(() => {
    const todayIsBeforeProjectStart = dayjs(startDate).isSameOrAfter(
      blankDayJs()
    )
    const eventIsAfterProjectStart = dayjs(dateFields.date).isSameOrAfter(
      startDate
    )

    if (!eventIsAfterProjectStart && todayIsBeforeProjectStart) {
      const newDate = generateDayJs(startDate)
      setDayPickerDayjs(newDate)
      const updatedDateFields = {
        ...dateFields,
        date: newDate.toISOString(),
        end: updateDateInTimeSelections(newDate, dateFields.end),
        start: updateDateInTimeSelections(newDate, dateFields.start),
      }
      setDateFields(updatedDateFields)
    }
  }, [])

  return (
    <>
      <AccessTime className='clock-icon' />
      <div className='fields-wrapper'>
        <div className='time-fields'>
          <DatePicker
            disablePast
            minDate={generateDayJs(startDate)}
            maxDate={generateDayJs(endDate)}
            format='MM/DD/YY'
            onChange={handleDate}
            slotProps={{
              textField: { size: 'small' },
              openPickerIcon: { sx: { position: 'absolute', right: '5px' } },
            }}
            sx={datePickerStyles}
            value={datePickerDayjs}
          />
          <div className='select-time-wrapper'>
            <SelectTime
              dateFields={dateFields}
              setDateFields={setDateFields}
              type={'start'}
            />
            <span className='span-dash'>&#8212;</span>
            <SelectTime
              dateFields={dateFields}
              setDateFields={setDateFields}
              type={'end'}
            />
          </div>
        </div>

        <SelectTimeZone
          dateFields={dateFields}
          setDateFields={setDateFields}
          eventTimezone={dateFields.eventTimezone}
        />
        <RecurringCheckbox
          setRecurrenceInfo={setRecurrenceInfo}
          recurrenceInfo={recurrenceInfo}
        />
        <RecurringDays
          recurrenceInfo={recurrenceInfo}
          handleSelect={handleSelect}
        />
      </div>
    </>
  )
}

const datePickerStyles = {
  fontSize: '14px',
  border: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid black',
  },
  marginRight: '20px',
  width: '180px',
  '&:hover': {
    cursor: 'pointer',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1.5px solid black',
    },
  },
}
