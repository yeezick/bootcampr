import { Dialog, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectDisplayedEvent,
  selectModalDisplayStatus,
  setModalDisplayStatus,
} from 'utils/redux/slices/calendarSlice'
import { selectMembersByEmail } from 'utils/redux/slices/projectSlice'

export const DisplayMeetingModal = () => {
  const [displayMeeting, setDisplayMeeting] = useState(false)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModalDisplayStatus(false))
  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }

  useEffect(() => {
    if (modalDisplayStatus === 'display') {
      setDisplayMeeting(true)
    } else {
      setDisplayMeeting(false)
    }
  }, [modalDisplayStatus])

  if (!displayedEvent) {
    return null
  }

  const { attendees, creator, dateFields, description, summary } =
    displayedEvent

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
            {dateFields.start} - {dateFields.end}
          </p>
        </div>

        {displayedEvent.attendees && (
          <DisplayAttendees attendees={displayedEvent.attendees} />
        )}

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

const DisplayAttendees = ({ attendees }) => {
  const emailQueries = attendees.map(attendee => attendee.email)
  const [invitedMembers, setInvitedMembers] = useState([])
  const teamMembers = useAppSelector(selectMembersByEmail(emailQueries))

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
