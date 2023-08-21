import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux'
import { fetchProjectCalendar } from 'utils/api/calendar'
import {
  selectCalendarId,
  selectMembersAsTeam,
  selectMembersByEmail,
} from 'utils/redux/slices/projectSlice'
import {
  convertGoogleEventsForCalendar,
  parseCalendarEventForMeetingInfo,
} from 'utils/helpers/calendarHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectConvertedEventsAsArr,
  selectCurrentEvent,
  setCurrentEvent,
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
    fetchAllEvents()
  }, [calendarId])

  /** Context
   * Update calendar view with new events added to calendar from MeetingModal.
   * *** Might not be needed anymore?
   */

  const handleEventClick = e =>
    dispatch(setCurrentEvent(parseCalendarEventForMeetingInfo(e)))

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
  const meetingModalInfo = useAppSelector(selectCurrentEvent)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(toggleMeetingModal(false))

  useEffect(() => {
    console.log('mmeting', meetingModalInfo)

    if (meetingModalInfo?.visibility === 'display') {
      setDisplayMeeting(true)
    } else {
      setDisplayMeeting(false)
    }
  }, [meetingModalInfo])

  if (!meetingModalInfo) {
    return null
  }
  const { creator, dateFields, meetingText } = meetingModalInfo

  return (
    <Dialog open={displayMeeting} onClose={handleClose}>
      <DialogContent>
        {/* Header */}
        <div>
          {/* img */}
          <h3>{meetingText.summary}</h3>
          <p>
            {dateFields.start} - {dateFields.end}
          </p>
        </div>

        {meetingModalInfo.attendees && (
          <DisplayAttendees attendees={meetingModalInfo.attendees} />
        )}

        {/* description */}
        <div>{meetingText.description}</div>

        <div>
          {' '}
          <p> Created by: {creator}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const DisplayAttendees = ({ attendees }) => {
  const [invitedMembers, setInvitedMembers] = useState([])
  const teamMembers = useAppSelector(selectMembersByEmail)

  useEffect(() => {
    const prepareInvitedMembers = () => {
      const invitedMemberInfo = []
      for (const member of attendees) {
        const { firstName, lastName, profilePicture } =
          teamMembers[member.email]
        invitedMemberInfo.push({
          firstName: firstName,
          profilePicture: profilePicture,
          lastName: lastName,
        })
      }
      setInvitedMembers(invitedMemberInfo)
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
