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
import { DateFieldsInterface, StringToBooleanObject } from 'interfaces'
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
import { combineDateWithTime, handleFormInputChange } from 'utils/helpers'
import './MeetingModalStyles.scss'
import { Clear, EditNote, Link } from '@mui/icons-material'

dayjs.extend(utc)
dayjs.extend(timezone)

export const MeetingModal = ({
  events,
  setEvents,
  toggleMeetingModal,
  visibleMeeting,
}) => {
  const [meetingText, setMeetingText] = useState(initialMeetingText)
  const [dateFields, setDateFields] =
    useState<DateFieldsInterface>(initialDateFields)
  const [attendees, setAttendees] = useState<StringToBooleanObject>({})
  const [inviteAll, toggleInviteAll] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  const radioGroupRef = useRef(null)
  const projectMembers = useAppSelector(selectProjectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)

  useEffect(() => {
    if (
      dateFields === initialDateFields &&
      meetingText.summary === '' &&
      meetingText.meetingLink === ''
    ) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [meetingText.summary, meetingText.meetingLink, dateFields])

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus()
    }
  }

  const handleClose = () => {
    setMeetingText(initialMeetingText)
    setDateFields(initialDateFields)
    setAttendees({})
    toggleInviteAll(false)
    toggleMeetingModal(false)
  }

  const handleInviteAll = () => {
    if (projectMembers) {
      const updatedAttendance = {}
      projectMembers.forEach(member => {
        // inviteAll is the current state,
        if (inviteAll === false) {
          updatedAttendance[member.email] = true
        } else {
          updatedAttendance[member.email] = false
        }
      })
      setAttendees(updatedAttendance)
      toggleInviteAll(!inviteAll)
    }
  }

  const handleSubmit = async () => {
    const { date, end, start, timeZone } = dateFields
    const { description, summary } = meetingText
    const attendeeList = []

    for (const email in attendees) {
      if (attendees[email] === true) {
        attendeeList.push({ email })
      }
    }

    const eventInfo = {
      description,
      summary,
      start: {
        dateTime: combineDateWithTime(start, date),
        timeZone,
      },
      end: {
        dateTime: combineDateWithTime(end, date),
        timeZone,
      },
      attendees: attendeeList,
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
      maxWidth='xs'
      TransitionProps={{ onEntering: handleEntering }}
      open={visibleMeeting}
    >
      <DialogContent sx={{ overflowX: 'hidden' }}>
        <div className='close-icon' onClick={handleClose}>
          <Clear />
        </div>
        <div style={{ marginTop: '20px' }}>
          <TextField
            label='Add Title'
            name='summary'
            InputLabelProps={{ sx: { fontSize: '32px' } }}
            onChange={e => handleFormInputChange(e, setMeetingText)}
            required
            sx={{
              marginBottom: '32px',
              width: '100%',
              '& .MuiInputLabel-asterisk': {
                color: 'orange',
              },
              '& .MuiInput-underline': {
                paddingTop: '17px',
              },
            }}
            value={meetingText.summary}
            variant='standard'
          />
          <DateFields dateFields={dateFields} setDateFields={setDateFields} />

          <SelectAttendees
            attendees={attendees}
            inviteAll={inviteAll}
            handleInviteAll={handleInviteAll}
            setAttendees={setAttendees}
            projectMembers={projectMembers}
          />
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
          disabled={disabledButton}
          onClick={handleSubmit}
          sx={{ backgroundColor: '#8048c8', textTransform: 'none' }}
          variant='contained'
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const MeetingTextField = ({ label, name, setMeetingText, value }) => {
  const handleMeetingTextField = e => handleFormInputChange(e, setMeetingText)

  let MeetingTextIcon = null
  if (name === 'description') {
    MeetingTextIcon = EditNote
  } else if (name === 'meetingLink') {
    MeetingTextIcon = Link
  }

  return (
    <div className='meeting-text-field'>
      {MeetingTextIcon && (
        <MeetingTextIcon
          sx={{ alignSelf: 'flex-end', padding: '5px 10px 5px 0px' }}
        />
      )}
      <TextField
        label={label}
        InputLabelProps={{ sx: { fontSize: '14px' } }}
        name={name}
        fullWidth
        onChange={handleMeetingTextField}
        required={name !== 'description' && true}
        sx={{
          '& .MuiInputLabel-asterisk': {
            color: 'orange',
          },
        }}
        value={value}
        variant='standard'
      />
    </div>
  )
}

const initialMeetingText = {
  summary: '',
  description: '',
  meetingLink: '',
}

const initialDateFields = {
  date: dayjs(),
  start: dayjs(),
  timeZone: dayjs.tz.guess(),
  end: dayjs(),
}
