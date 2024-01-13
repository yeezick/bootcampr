import { Checkbox, FormControlLabel } from '@mui/material'
import { MeetingAvailability } from './MeetingAvailability'
import '../styles/MemberCheckbox.scss'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { generateDayJs } from 'utils/helpers'

export const MemberCheckbox = ({
  attendees,
  currMember,
  dateFields,
  setAttendees,
}) => {
  const handleMemberSelection = e => {
    setAttendees(state => {
      return { ...state, [e.target.name]: e.target.checked }
    })
  }

  const [isAvailable, setIsAvailable] = useState('unavailable')

  useEffect(() => {
    const determineUserAvailability = (
      currMember,
      dateFields,
      setIsAvailable
    ) => {
      const [weekday, eventDate] = generateDayJs(dateFields.start)
        .format('ddd-M/D/YYYY')
        .split('-')
      const weekDay = weekday.toUpperCase()
      const { availability } = currMember
      const dayAvailability = availability[weekDay].availability
      for (let i = 0; i < dayAvailability.length; i++) {
        const [timeSlotStart, timeSlotEnd] = dayAvailability[i]
        const isLastSlot = i === dayAvailability.length - 1
        const timeSlotStartDayJs = generateDayJs(
          `${eventDate} ${timeSlotStart}`
        )
        const timeSlotEndDayJs = generateDayJs(`${eventDate} ${timeSlotEnd}`)
        const startDifference = timeSlotStartDayJs.diff(
          dateFields.start,
          'minute'
        )
        const endDifference = timeSlotEndDayJs.diff(dateFields.end, 'minute')
        const differenceFromSlotStartToEventEnd = timeSlotStartDayJs.diff(
          dateFields.end,
          'minute'
        )
        const differenceFromSlotEndToEventStart = timeSlotEndDayJs.diff(
          dateFields.start,
          'minute'
        )

        const startSlotGreaterThanEventEnd =
          differenceFromSlotStartToEventEnd >= 0
        const endSlotEarlierThanEventStart =
          differenceFromSlotEndToEventStart <= 0
        const startEarlierEndDuring = startDifference <= 0 && endDifference < 0
        const startEarlierEndLater = startDifference <= 0 && endDifference >= 0
        const startDuringEndDuring = startDifference >= 0 && endDifference < 0
        const startDuringEndLater = startDifference >= 0 && endDifference >= 0

        if (startSlotGreaterThanEventEnd) {
          setIsAvailable('unavailable')
          break
        } else if (endSlotEarlierThanEventStart) {
          if (isLastSlot) {
            setIsAvailable('unavailable')
          } else {
            continue
          }
        } else if (startEarlierEndLater) {
          setIsAvailable('available')
          break
        } else if (
          startEarlierEndDuring ||
          startDuringEndDuring ||
          startDuringEndLater
        ) {
          // Partial availability
          setIsAvailable('unavailable')
          break
        }
      }
    }

    determineUserAvailability(currMember, dateFields, setIsAvailable)
  }, [dateFields.start, dateFields.end])

  let availabilityText = ''
  if (isAvailable === 'available') {
    availabilityText = 'Available'
  } else if (isAvailable === 'partial') {
    availabilityText = 'Partially available'
  } else {
    availabilityText = 'Unavailable'
  }

  return (
    <div
      key={`select-member-${currMember._id}`}
      className={
        isAvailable === 'unavailable'
          ? 'member-checkbox-unavailable'
          : 'member-checkbox'
      }
    >
      <ListItem sx={{ padding: '0px', margin: '0px', width: '100%' }}>
        <Checkbox
          checked={attendees[currMember.email] || false}
          onChange={handleMemberSelection}
          name={currMember.email}
          sx={{ checkboxStyle }}
        />
        <ListItemAvatar>
          <Avatar>
            <img src={currMember.defaultProfilePicture} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${currMember.firstName} ${currMember.lastName}`}
          secondary={currMember.role}
        />
      </ListItem>
      <MeetingAvailability availabilityText={availabilityText} />
    </div>
  )
}

const checkboxStyle = {
  '&$checked': {
    fill: 'red',
  },
}
