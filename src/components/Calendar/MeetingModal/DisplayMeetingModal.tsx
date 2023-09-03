import { Dialog, DialogContent } from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useEffect, useState } from 'react'
// import { collectEmailsFromAttendees } from 'utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectDisplayedEvent,
  selectModalDisplayStatus,
  toggleMeetingModal,
} from 'utils/redux/slices/calendarSlice'
import { selectMembersByEmail } from 'utils/redux/slices/projectSlice'

dayjs.extend(utc)
dayjs.extend(timezone)

export const DisplayMeetingModal = () => {
  const [displayMeeting, setDisplayMeeting] = useState(false)
  const [startTimeStr, setStartTimeStr] = useState('')
  const [endTimeStr, setEndTimeStr] = useState('')
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(toggleMeetingModal(false))
  const handleEdit = () => {
    dispatch(toggleMeetingModal('edit'))
    setDisplayMeeting(false)
  }

  useEffect(() => {
    if (modalDisplayStatus === 'display') {
      const { end, start } = displayedEvent.dateFields
      setDisplayMeeting(true)
      setStartTimeStr(dayjs(start).format('dddd, MMMM D'))
      setEndTimeStr(dayjs(end).format('dddd, MMMM D'))
    } else {
      setDisplayMeeting(false)
    }
  }, [modalDisplayStatus])

  if (!displayedEvent) {
    return null
  }

  const { attendees, creator, dateFields, description, summary } =
    displayedEvent
  console.log('df: ', dateFields)

  return (
    <Dialog open={displayMeeting} onClose={handleClose}>
      <DialogContent>
        <div>
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleClose}>close</button>
        </div>

        {/* Header */}
        <div>
          {/* img */}
          <h3>{summary}</h3>
          <p>
            {startTimeStr} -{endTimeStr}
          </p>
        </div>

        {/* {displayedEvent.attendees && (
          <DisplayAttendees attendees={displayedEvent.attendees} />
        )} */}

        {/* description */}
        <div>{description}</div>

        <div>
          <p>link icon</p>
          <p>{displayedEvent.location}</p>
        </div>

        <div>
          <p> Created by: {creator.email}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/*
const DisplayAttendees = ({ attendees }) => {
  const [invitedMembers, setInvitedMembers] = useState([])
  const teamMembers = useAppSelector(
    selectMembersByEmail(collectEmailsFromAttendees(attendees))
  )

  useEffect(() => {
    const prepareInvitedMembers = () => {
      if (attendees.length) {
        const invitedMemberInfo = []
        for (const member of teamMembers) {
          const { firstName, lastName, profilePicture } = member
          invitedMemberInfo.push({
            firstName: firstName,
            profilePicture: profilePicture,
            lastName: lastName,
          })
        }
        setInvitedMembers(invitedMemberInfo)
      }
    }
    prepareInvitedMembers()
  }, [])

  return (
    <>
      {invitedMembers.map(member => (
        <>
          <p>pic</p>
          <p>{member.firstName}</p>
          <p> {member.lastName}</p>
        </>
      ))}
    </>
  )
}
*/
