import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectMembersByEmail,
} from 'utils/redux/slices/projectSlice'
import {
  convertGoogleEventsForCalendar,
  parseCalendarEventForMeetingInfo,
} from 'utils/helpers/calendarHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectConvertedEventsAsArr,
  selectDisplayedEvent,
  selectModalDisplayStatus,
  setDisplayedEvent,
  storeConvertedEvents,
  toggleMeetingModal,
} from 'utils/redux/slices/calendarSlice'
import { Dialog, DialogContent } from '@mui/material'

export const CalendarView = () => {
  const calendarId = useSelector(selectCalendarId)
  const convertedEventsAsArr = useSelector(selectConvertedEventsAsArr)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()

  // TODO: only hydrate calendar with events in user.meetings
  useEffect(() => {
    const fetchAllEvents = async () => {
      const googleCalendarEvents = await fetchProjectCalendar(calendarId)
      setIsLoading(false)
      dispatch(
        storeConvertedEvents(
          convertGoogleEventsForCalendar(googleCalendarEvents)
        )
      )
    }
    if (calendarId) {
      fetchAllEvents()
    }
  }, [calendarId])

  /** Context
   * Update calendar view with new events added to calendar from MeetingModal.
   * *** Might not be needed anymore?
   */

  const handleEventClick = e =>
    dispatch(setDisplayedEvent(parseCalendarEventForMeetingInfo(e)))

  return (
    <div>
      {isLoading ? (
        <p>LOADING</p>
      ) : (
        <FullCalendar
          events={convertedEventsAsArr}
          eventClick={handleEventClick}
          headerToolbar={{
            start: 'dayGridMonth timeGridWeek today',
            center: 'title',
            end: 'prev next',
          }}
          initialView='timeGridWeek'
          nowIndicator={true}
          plugins={[dayGridPlugin, timeGridPlugin]}
        />
      )}
      <DisplayMeetingModal />
    </div>
  )
}

const DisplayMeetingModal = () => {
  const [displayMeeting, setDisplayMeeting] = useState(false)
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
