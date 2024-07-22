import { Dialog, DialogContent, DialogActions, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { BooleanObject, DateFieldsInterface, EventInfo } from 'interfaces'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { successSnackbar, errorSnackbar } from 'utils/helpers/commentHelpers'
import {
  selectCalendarId,
  selectMembersAsTeam,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { SelectAttendees } from './SelectAttendees'
import { DateFields } from './DateFields'
import {
  createEvent,
  fetchRecurringEvents,
  updateEvent,
} from 'utils/api/events'
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
  storeConvertedEvents,
  updateExistingEvent,
} from 'utils/redux/slices/calendarSlice'
import '../styles/EditableMeetingModal.scss'
import { MeetingModalHeaderIcons } from './MeetingModalHeaderIcons'
import { GoogleMeetsToggler } from './GoogleMeetsToggler'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import { PrimaryButton } from 'components/Buttons'
import { isEmptyString } from 'utils/helpers/inputUtils'

export const EditableMeetingModal = () => {
  const [meetingText, setMeetingText] = useState(initialMeetingText)
  const [dateFields, setDateFields] = useState<DateFieldsInterface>(
    initialDateFields()
  )
  const [recurrenceRule, setRecurrenceRule] = useState<string | null>(null)
  const [attendees, setAttendees] = useState<BooleanObject>({})
  const [inviteAll, toggleInviteAll] = useState(false)
  const [visibleModal, toggleVisibleModal] = useState(false)
  const [googleMeeting, toggleGoogleMeeting] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const radioGroupRef = useRef(null)
  const authUser = useAppSelector(selectAuthUser)
  const projectId = useAppSelector(selectProjectId)
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (dateFields.eventTimezone) {
      setDisabledBtn(isEmptyString(meetingText.summary))
    }
  }, [meetingText, dateFields.eventTimezone])

  useEffect(() => {
    if (modalDisplayStatus === 'create') {
      const updatedAttendees = { ...attendees }
      if (isSandboxId(calendarId)) {
        updatedAttendees['dana@designer.com'] = true
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

  const handleRecurrenceChange = (rule: string | null) => {
    setRecurrenceRule(rule)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
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
      organizer: authUser.email,
      projectId,
      recurrence: recurrenceRule ? [recurrenceRule] : [],
    }

    try {
      if (modalDisplayStatus === 'create') {
        const newEvent = await createEvent(calendarId, eventInfo)

        if (newEvent.rrule) {
          const recurringEvents = await fetchRecurringEvents(
            calendarId,
            newEvent.eventId
          )
          dispatch(storeConvertedEvents(recurringEvents))
        } else {
          dispatch(
            addNewEvent({
              ...newEvent,
              recurringEventId: newEvent.rrule ? newEvent.eventId : null,
            })
          )
        }

        dispatch(successSnackbar('Invite sent successfully!'))
      } else if (modalDisplayStatus === 'edit') {
        const updatedEvent = await updateEvent(
          calendarId,
          displayedEvent.eventId,
          eventInfo
        )
        dispatch(updateExistingEvent(updatedEvent))
        dispatch(successSnackbar('Meeting updated successfully!'))
      }
      handleClose()
    } catch (error) {
      console.error(
        `Error handling event for calendar (${calendarId}): `,
        error
      )
      dispatch(
        errorSnackbar('Unable to process the meeting. Please try again.')
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      className='meeting-modal'
      TransitionProps={{ onEntering: handleEntering }}
      open={visibleModal}
      sx={modalStyles}
    >
      <form>
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
              onRecurrenceChange={handleRecurrenceChange}
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
        <DialogActions>
          <PrimaryButton
            onClick={handleSubmit}
            loading={isLoading}
            disabled={disabledBtn}
            label='Send Invite'
            style={{ margin: '32px' }}
          />
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

const modalStyles = {
  '& .MuiPaper-root': {
    borderRadius: '0px',
    width: '600px',
  },
}
