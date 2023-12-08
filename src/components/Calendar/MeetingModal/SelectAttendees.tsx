import { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { checkIfAllMembersInvited, generateDayJs } from 'utils/helpers'
import './MeetingModal'
import { removeAuthUserFromList } from 'utils/helpers/projectHelpers'

export const SelectAttendees = ({
  authUser,
  attendees,
  dateFields,
  inviteAll,
  handleInviteAll,
  setAttendees,
  toggleInviteAll,
  projectMembers,
}) => {
  const filteredMembers = removeAuthUserFromList(projectMembers, authUser)
  /** Context
   * Unselect inviteAll checkbox if user has unselected members
   */
  useEffect(() => {
    checkIfAllMembersInvited(
      attendees,
      projectMembers,
      inviteAll,
      toggleInviteAll
    )
  }, [attendees])

  if (projectMembers) {
    return (
      <div className='select-attendees-section'>
        <div className='select-attendees-wrapper'>
          <FormControlLabel
            control={
              <Checkbox checked={inviteAll} onChange={handleInviteAll} />
            }
            label='Invite all'
          />
          <FormGroup>
            {projectMembers.map(currMember => (
              <div key={`select-member-${currMember._id}`}>
                <MemberCheckbox
                  attendees={attendees}
                  currMember={currMember}
                  dateFields={dateFields}
                  setAttendees={setAttendees}
                />
              </div>
            ))}
          </FormGroup>
          <span className='select-attendees-helper-text'>
            Email invite will be sent to selected members
          </span>
        </div>
      </div>
    )
  } else return null
}

const MemberCheckbox = ({
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

  return (
    <div className='member-checkbox'>
      <FormControlLabel
        control={
          <Checkbox
            checked={attendees[currMember.email] || false}
            onChange={handleMemberSelection}
            name={currMember.email}
          />
        }
        label={`${currMember.firstName} ${currMember.lastName}`}
      />
      <MeetingAvailability currMember={currMember} dateFields={dateFields} />
    </div>
  )
}

const MeetingAvailability = ({ currMember, dateFields }) => {
  const [isAvailable, setIsAvailable] = useState('unavailable')
  const [weekday, eventDate] = generateDayJs(dateFields.start)
    .format('ddd-M/D/YYYY')
    .split('-')
  const weekDay = weekday.toUpperCase()
  const { availability } = currMember

  useEffect(() => {
    const dayAvailability = availability[weekDay].availability
    //  for each slot in the user's availability
    for (let i = 0; i < dayAvailability.length; i++) {
      const [timeSlotStart, timeSlotEnd] = dayAvailability[i]
      const isLastSlot = i === dayAvailability.length - 1
      // Convert timeslots into dayjs object
      const timeSlotStartDayJs = generateDayJs(`${eventDate} ${timeSlotStart}`)
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

      /* All possible cases for user's availability
       * + means later than
       * - means eariler than
       * Difference in time
       * Time point A => Time point B
       * 4:30 PM => 10:30 PM
       * 4:30 is -360 minutes from 10:30 PM
       * Most of these are partial availability & strictly set the foundation for that logic if we were to pursue it
       * TODO: Add visuals
       */
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
        setIsAvailable('unavailable')
        break
      }
    }
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
    <div className='availability-text'>
      <p>{availabilityText}</p>
    </div>
  )
}
