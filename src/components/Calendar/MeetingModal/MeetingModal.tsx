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
import {
  BooleanObject,
  DateFieldsAsDayjs,
  DateFieldsInterface,
} from 'interfaces'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectCalendarId,
  selectMembersAsTeam,
} from 'utils/redux/slices/projectSlice'
import { SelectAttendees } from './SelectAttendees'
import { DateFields } from './DateFields'
import { createEvent } from 'utils/api/events'
import {
  checkIfAllMembersInvited,
  convertGoogleEventsForCalendar,
  handleFormInputChange,
  initialDateFields,
} from 'utils/helpers'
import { AccessTime, Clear, People } from '@mui/icons-material'
import { MeetingTextField } from './MeetingTextField'
import { initialMeetingText } from 'utils/data/calendarConstants'
import './MeetingModalStyles.scss'
import {
  addNewEvent,
  selectDisplayedEvent,
  selectModalDisplayStatus,
  toggleMeetingModal,
} from 'utils/redux/slices/calendarSlice'

dayjs.extend(utc)
dayjs.extend(timezone)

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
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (modalDisplayStatus === 'create') {
      toggleVisibleModal(true)
    } else if (modalDisplayStatus === 'edit') {
      const { description, gDateFields, location, summary } = displayedEvent

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
        date: gDateFields.startTime,
        end: gDateFields.endTime,
        start: gDateFields.startTime,
        timeZone: dateFields.timeZone,
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
    setAttendees({})
    toggleInviteAll(false)
    dispatch(toggleMeetingModal(false))
  }

  const handleInviteAll = () => {
    if (projectMembers) {
      const updatedAttendance = {}
      projectMembers.forEach(member => {
        // inviteAll is the current state
        updatedAttendance[member.email] = !inviteAll
      })
      setAttendees(updatedAttendance)
      toggleInviteAll(!inviteAll)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { end, start, timeZone } = dateFields
    const { description, summary } = meetingText
    const attendeeList = []

    for (const email in attendees) {
      if (attendees[email] === true) {
        attendeeList.push({ email })
      }
    }

    const eventInfo = {
      attendees: attendeeList,
      description,
      location: meetingText.meetingLink,
      end: {
        dateTime: end,
      },
      start: {
        dateTime: start,
      },
      summary,
    }

    try {
      const newEvent = await createEvent(calendarId, eventInfo)
      dispatch(addNewEvent(convertGoogleEventsForCalendar([newEvent.data])))
      handleClose()
    } catch (error) {
      console.error(
        `Error creating event for calendar (${calendarId}): `,
        error
      )
    }
  }

  return (
    <Dialog
      className='meeting-modal'
      maxWidth='lg'
      TransitionProps={{ onEntering: handleEntering }}
      open={visibleModal}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className='modal-dialog-content'>
          <div className='close-icon'>
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

// Not a priority, discuss with team.
const GoogleMeetsToggler = ({ googleMeeting, toggleGoogleMeeting }) => {
  const handleMeetToggler = () => toggleGoogleMeeting(!googleMeeting)

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
