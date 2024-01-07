import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { BooleanObject, DateFieldsInterface } from 'interfaces'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectCalendarId,
  selectMembersAsTeam,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { SelectAttendees } from './SelectAttendees'
import { DateFields } from './DateFields'
import { createEvent, updateEvent } from 'utils/api/events'
import {
  checkIfAllMembersInvited,
  handleFormInputChange,
  initialDateFields,
} from 'utils/helpers'
import { AccessTime, Clear, People } from '@mui/icons-material'
import { MeetingTextField } from './MeetingTextField'
import { initialMeetingText } from 'utils/data/calendarConstants'
import {
  addNewEvent,
  selectDisplayedEvent,
  selectModalDisplayStatus,
  setModalDisplayStatus,
  updateExistingEvent,
} from 'utils/redux/slices/calendarSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './MeetingModalStyles.scss'

dayjs.extend(utc)
dayjs.extend(timezone)

type AttendeeList = { email: string }
interface EventInfo {
  attendees: AttendeeList[]
  description: string
  location: string
  googleMeetingInfo: {
    enabled: boolean
    hangoutLink?: string
  }
  end: {
    dateTime: string
  }
  start: {
    dateTime: string
  }
  summary: string
  projectId: string
}

export const MeetingModal = () => {
  const [meetingText, setMeetingText] = useState(initialMeetingText)
  const [dateFields, setDateFields] = useState<DateFieldsInterface>(
    initialDateFields()
  )
  const [attendees, setAttendees] = useState<BooleanObject>({})
  const [inviteAll, toggleInviteAll] = useState(false)
  const [visibleModal, toggleVisibleModal] = useState(false)
  const [googleMeeting, toggleGoogleMeeting] = useState(false)
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const radioGroupRef = useRef(null)
  const authUser = useAppSelector(selectAuthUser)
  const projectId = useAppSelector(selectProjectId)
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (modalDisplayStatus === 'create') {
      const updatedAttendees = { ...attendees }
      updatedAttendees[authUser.email] = true
      setAttendees(updatedAttendees)

      toggleVisibleModal(true)
    } else if (modalDisplayStatus === 'edit') {
      const { description, googleDateFields, location, summary } =
        displayedEvent

      if (displayedEvent?.attendees) {
        const prefilledAttendees = {}
        for (const attendee of displayedEvent.attendees) {
          prefilledAttendees[attendee.email] = true
        }
        setAttendees(prefilledAttendees)
      }

      const prefilledMeetingText = {
        description,
        meetingLink: location,
        summary,
      }

      const prefilledDateFields: DateFieldsInterface = {
        date: googleDateFields.startTime,
        end: googleDateFields.endTime,
        start: googleDateFields.startTime,
        timeZone: dateFields.timeZone,
      }

      if (displayedEvent.googleMeetingInfo.enabled) {
        toggleGoogleMeeting(true)
      }

      setMeetingText(prefilledMeetingText)
      setDateFields(prefilledDateFields)
      checkIfAllMembersInvited(
        attendees,
        projectMembers,
        inviteAll,
        toggleInviteAll
      )
      toggleVisibleModal(true)
    } else {
      toggleVisibleModal(false)
    }
  }, [modalDisplayStatus])

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus()
    }
  }

  const handleClose = () => {
    setMeetingText(initialMeetingText)
    setDateFields(initialDateFields())
    toggleGoogleMeeting(false)
    setAttendees({})
    toggleInviteAll(false)
    dispatch(setModalDisplayStatus(false))
  }

  const handleInviteAll = () => {
    if (projectMembers) {
      const updatedAttendance = { ...attendees }
      projectMembers?.forEach(member => {
        // inviteAll is the current state
        if (member.email !== authUser.email) {
          updatedAttendance[member.email] = !inviteAll
        }
      })
      setAttendees(updatedAttendance)
      toggleInviteAll(!inviteAll)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { end, start } = dateFields
    const { description, summary } = meetingText
    const attendeeList = []

    for (const email in attendees) {
      if (attendees[email] === true) {
        attendeeList.push({ email })
      }
    }

    const eventInfo: EventInfo = {
      attendees: attendeeList,
      description,
      location: googleMeeting ? 'enabled' : '',
      // Enabling hangout links for existing meetings and existing meetings that have toggled off google meet events
      googleMeetingInfo: {
        enabled: googleMeeting,
      },
      end: {
        dateTime: end,
      },
      start: {
        dateTime: start,
      },
      summary,
      projectId,
    }
    console.log('meta', displayedEvent)

    // if (displayedEvent && displayedEvent.googleMeetingInfo.hangoutLink) {
    //   eventInfo.googleMeetingInfo.hangoutLink =
    //     displayedEvent.googleMeetingInfo.hangoutLink
    // }
    console.log('eventInfo', eventInfo)
    if (modalDisplayStatus === 'create') {
      try {
        const newEvent = await createEvent(calendarId, eventInfo)
        dispatch(addNewEvent(newEvent))
        handleClose()
      } catch (error) {
        console.error(
          `Error creating event for calendar (${calendarId}): `,
          error
        )
      }
    } else if (modalDisplayStatus === 'edit') {
      try {
        const updatedEvent = await updateEvent(
          calendarId,
          displayedEvent.eventId,
          eventInfo
        )
        dispatch(updateExistingEvent(updatedEvent))
        handleClose()
      } catch (error) {
        console.error(
          `Error creating event for calendar (${calendarId}): `,
          error
        )
      }
    }
  }

  const handleBackToDisplay = () => dispatch(setModalDisplayStatus('display'))

  return (
    <Dialog
      className='meeting-modal'
      maxWidth='lg'
      TransitionProps={{ onEntering: handleEntering }}
      open={visibleModal}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className='modal-dialog-content'>
          <div className='meeting-modal-icons'>
            <ArrowBackIcon
              className='back-arrow-icon'
              onClick={handleBackToDisplay}
            />
            <Clear className='clear-icon' onClick={handleClose} />
          </div>
          <div className='content-wrapper'>
            <TextField
              label='Add Title'
              name='summary'
              InputLabelProps={{ className: 'title-input-label' }}
              onChange={e => handleFormInputChange(e, setMeetingText)}
              required
              sx={titleInputFieldStyles}
              value={meetingText.summary}
              variant='standard'
            />
            <div className='date-attendee-wrapper'>
              <div className='clock-icon'>
                <AccessTime sx={{ color: iconColor }} />
              </div>
              <div className='people-icon'>
                <People sx={{ color: iconColor, marginTop: '8px' }} />
              </div>

              <DateFields
                dateFields={dateFields}
                setDateFields={setDateFields}
                dayjs={dayjs}
              />

              <SelectAttendees
                attendees={attendees}
                dateFields={dateFields}
                inviteAll={inviteAll}
                handleInviteAll={handleInviteAll}
                setAttendees={setAttendees}
                toggleInviteAll={toggleInviteAll}
                projectMembers={projectMembers}
              />
            </div>

            <div className='meeting-modal-divider' />
            <MeetingTextField
              label='Add description'
              name='description'
              setMeetingText={setMeetingText}
              value={meetingText.description}
            />
            <MeetingTextField
              label='Add meeting link'
              name='meetingLink'
              setMeetingText={setMeetingText}
              value={meetingText.meetingLink}
            />
          </div>
          <GoogleMeetsToggler
            googleMeeting={googleMeeting}
            toggleGoogleMeeting={toggleGoogleMeeting}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: '#8048c8', textTransform: 'none' }}
            type='submit'
            variant='contained'
          >
            CREATE
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const GoogleMeetsToggler = ({ googleMeeting, toggleGoogleMeeting }) => {
  const handleMeetToggler = () => {
    toggleGoogleMeeting(!googleMeeting)
  }

  return (
    <div className='google-meet-toggler'>
      <FormControlLabel
        control={
          <Checkbox checked={googleMeeting} onChange={handleMeetToggler} />
        }
        label='Add Google Meet (video call)'
      />
    </div>
  )
}

const titleInputFieldStyles = {
  marginBottom: '32px',
  width: '100%',
  '& .MuiInputLabel-asterisk': {
    color: 'orange',
  },
  '& .MuiInput-underline': {
    paddingTop: '17px',
  },
}

const iconColor = '#86888A'
