import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { useRef, useState } from 'react'
import { BooleanObject, DateFieldsInterface } from 'interfaces'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCalendarId,
  selectProjectMembersAsTeam,
} from 'utils/redux/slices/projectSlice'
import { SelectAttendees } from './SelectAttendees'
import { DateFields } from './DateFields'
import { createEvent } from 'utils/api/events'
import { handleFormInputChange, initialDateFields } from 'utils/helpers'
import './MeetingModalStyles.scss'
import { AccessTime, Clear, People } from '@mui/icons-material'
import { MeetingTextField } from './MeetingTextField'
import { initialMeetingText } from 'utils/data/calendarConstants'

dayjs.extend(utc)
dayjs.extend(timezone)

export const MeetingModal = ({
  events,
  setEvents,
  toggleMeetingModal,
  visibleMeeting,
}) => {
  const [meetingText, setMeetingText] = useState(initialMeetingText)
  const [dateFields, setDateFields] = useState<DateFieldsInterface>(
    initialDateFields()
  )
  const [attendees, setAttendees] = useState<BooleanObject>({})
  const [inviteAll, toggleInviteAll] = useState(false)
  const radioGroupRef = useRef(null)
  const projectMembers = useAppSelector(selectProjectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)

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
    toggleMeetingModal(false)
  }

  const handleInviteAll = () => {
    if (projectMembers) {
      const updatedAttendance = {}
      projectMembers?.forEach(member => {
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
      end: {
        dateTime: end.format('YYYY-MM-DDTHH:mm:ss'),
        timeZone,
      },
      start: {
        dateTime: start.format('YYYY-MM-DDTHH:mm:ss'),
        timeZone,
      },
      summary,
    }

    try {
      const newEvent = await createEvent(calendarId, eventInfo)
      setEvents([...events, newEvent.data])
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
      open={visibleMeeting}
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
