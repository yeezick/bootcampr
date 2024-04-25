import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { BooleanObject, DateFieldsInterface, EventInfo } from 'interfaces'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectCalendarId,
  selectMembersAsTeam,
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { SelectAttendees } from './SelectAttendees'
import { DateFields } from './DateFields'
import { createEvent, updateEvent } from 'utils/api/events'
import {
  changeDateTimeZone,
  checkIfAllMembersInvited,
  handleFormInputChange,
  initialDateFields,
} from 'utils/helpers'
import { DescriptionField } from './MeetingTextField'
import { initialMeetingText } from 'utils/data/calendarConstants'
import {
  addNewEvent,
  selectDisplayedEvent,
  selectModalDisplayStatus,
  setModalDisplayStatus,
  updateExistingEvent,
} from 'utils/redux/slices/calendarSlice'
import '../styles/EditableMeetingModal.scss'
import { MeetingModalHeaderIcons } from './MeetingModalHeaderIcons'
import { GoogleMeetsToggler } from './GoogleMeetsToggler'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import { PrimaryButton } from 'components/Buttons/ButtonVariants'
import { isSandboxId } from 'utils/helpers/taskHelpers'

export const EditableMeetingModal = ({ handleOpenAlert }) => {
  const [meetingText, setMeetingText] = useState(initialMeetingText)
  const [dateFields, setDateFields] = useState<DateFieldsInterface>(
    initialDateFields()
  )
  const { endDate } = useAppSelector(selectProjectTimeline)
  const dayjsED = dayjs(endDate).format('YYYYMMDD')
  const [recurrenceEnabled, setRecurrenceEnabled] = useState(false)
  // const [rruleData, setRruleData] = useState({
  //   freq: 'WEEKLY',
  //   byweekday: [],
  //   until: dayjsED,
  // })
  const [rruleData, setRruleData] = useState('')
  const [attendees, setAttendees] = useState<BooleanObject>({})
  const [inviteAll, toggleInviteAll] = useState(false)
  const [visibleModal, toggleVisibleModal] = useState(false)
  const [googleMeeting, toggleGoogleMeeting] = useState(false)
  const [days, setDays] = useState([])
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const radioGroupRef = useRef(null)
  const authUser = useAppSelector(selectAuthUser)
  const projectId = useAppSelector(selectProjectId)
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)
  const userEmail = useAppSelector(selectUserEmail)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (modalDisplayStatus === 'create') {
      const updatedAttendees = { ...attendees }
      if (isSandboxId(calendarId)) {
        updatedAttendees['star@struck.com'] = true
      } else {
        updatedAttendees[authUser.email] = true
      }
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
        eventTimezone: dateFields.eventTimezone,
      }

      if (displayedEvent.hangoutLink) {
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

  const handleSelectToggleDays = (event, value) => {
    setDays(value)
    setRruleData(`RRULE:FREQ=WEEKLY;UNTIL=${dayjsED};BYDAY=${value.toString()}`)
  }

  const handleInviteAll = () => {
    if (projectMembers) {
      const updatedAttendance = { ...attendees }
      projectMembers?.forEach(member => {
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
    const { end, start, eventTimezone } = dateFields
    const { description, summary } = meetingText
    const attendeeList = []

    const updatedStartTime = changeDateTimeZone(start, eventTimezone)
    const updatedEndTime = changeDateTimeZone(end, eventTimezone)

    for (const email in attendees) {
      if (attendees[email] === true) {
        attendeeList.push({ email })
      }
    }

    attendeeList.forEach(attendee => {
      attendee.email === userEmail
        ? (attendee.comment = 'organizer')
        : (attendee.comment = 'not organizer')
    })

    const eventInfo: EventInfo = {
      attendees: attendeeList,
      description,
      googleMeetingInfo: {
        enabled: googleMeeting,
        hangoutLink:
          modalDisplayStatus === 'edit' && displayedEvent.hangoutLink,
      },
      end: {
        dateTime: updatedEndTime,
        timeZone: eventTimezone,
      },
      start: {
        dateTime: updatedStartTime,
        timeZone: eventTimezone,
      },
      summary,
      projectId,
      recurrence: {
        enabled: recurrenceEnabled,
        rrule: rruleData,
      },
    }

    console.log(eventInfo)

    if (modalDisplayStatus === 'create') {
      try {
        const newEvent = await createEvent(calendarId, eventInfo)
        console.log(newEvent)
        dispatch(addNewEvent(newEvent))
        handleClose()
        handleOpenAlert()
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

  return (
    <Dialog
      className='meeting-modal'
      maxWidth='lg'
      TransitionProps={{ onEntering: handleEntering }}
      open={visibleModal}
      sx={modalStyles}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className='modal-dialog-content'>
          <MeetingModalHeaderIcons handleCloseMeetingModal={handleClose} />
          <div className='content-wrapper'>
            <div className='title-field'>
              <TextField
                placeholder='Add Title'
                name='summary'
                InputLabelProps={{ className: 'title-input-label' }}
                onChange={e => handleFormInputChange(e, setMeetingText)}
                required
                sx={titleInputFieldStyles}
                value={meetingText.summary}
                variant='standard'
              />
              <span className='required-span'>*This field is required</span>
            </div>
            <DateFields
              dateFields={dateFields}
              setDateFields={setDateFields}
              dayjs={dayjs}
              days={days}
              handleSelect={handleSelectToggleDays}
              recurrenceEnabled={recurrenceEnabled}
              setRecurrenceEnabled={setRecurrenceEnabled}
            />
            <SelectAttendees
              attendees={attendees}
              dateFields={dateFields}
              inviteAll={inviteAll}
              handleInviteAll={handleInviteAll}
              setAttendees={setAttendees}
              toggleInviteAll={toggleInviteAll}
            />
            <div className='meeting-modal-divider' />
            <GoogleMeetsToggler
              googleMeeting={googleMeeting}
              toggleGoogleMeeting={toggleGoogleMeeting}
            />
            <DescriptionField
              label='Add description'
              name='description'
              setMeetingText={setMeetingText}
              value={meetingText.description}
            />
          </div>
        </DialogContent>
        <DialogActions sx={buttonDivStyle}>
          <PrimaryButton text={'Send Invite'} type={'submit'} />
        </DialogActions>
      </form>
    </Dialog>
  )
}

const titleInputFieldStyles = {
  marginBottom: '5px',
  color: '#616161',
  width: '100%',
  '& .MuiInputBase-root': {
    '&:hover': {
      borderBottom: 'none',
    },
  },
  '&:hover': {
    borderBottom: 'none',
  },
  '& .MuiInputBase-input': {
    fontSize: '28px',

    '&:focus': {},
  },
  '& .MuiInputLabel-asterisk': {
    color: 'orange',
  },
  '& .MuiInput-underline': {
    paddingTop: '17px',
  },
  '&:before': {
    borderBottom: 'none',
  },
  '&:after': {
    borderBottom: 'none',
  },
}

const buttonDivStyle = {
  padding: '32px',
}

const modalStyles = {
  '& .MuiPaper-root': {
    borderRadius: '0px',
  },
}
