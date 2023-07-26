import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useRef, useState } from 'react'
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
import { combineDateWithTime } from 'utils/helpers/calendarHelpers'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'

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
  const radioGroupRef = useRef(null)
  const projectMembers = useAppSelector(selectProjectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus()
    }
  }

  const handleInviteAll = () => {
    if (projectMembers) {
      const updatedAttendance = {}
      projectMembers.forEach(member => {
        // `inviteAll` is its current state; not yet updated
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
    // Package request to fit calendar event
    // Fetch calendarId from backend during submission
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
      setMeetingText(initialMeetingText)
      setDateFields(initialDateFields)
      setAttendees({})
      toggleInviteAll(false)
      toggleMeetingModal(false)
    } catch (error) {
      console.error(
        `Error creating event for calendar (${calendarId}): `,
        error
      )
    }
  }

  /*
const sampleNewEvent = {
    "calendarId": "{{CALENDAR_ID}}@group.calendar.google.com",
    "resource": {
        "description": "description",
        "summary": "1",
        "start": {
            "dateTime": "2023-05-29T16:00:00Z",
            "timeZone": "America/New_York"
        },
        "end": {
            "dateTime": "2023-05-29T17:00:00Z",
            "timeZone": "America/New_York"
        },
        "attendees": [
            {
                "email": "{{USER_EMAIL}}@gmail.com"
            }
        ]
    },
    "sendUpdates": "all"
};
*/

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth='xs'
      TransitionProps={{ onEntering: handleEntering }}
      open={visibleMeeting}
    >
      <DialogContent>
        <TextField
          label='Title'
          name='summary'
          placeholder='Add title'
          onChange={e => handleFormInputChange(e, setMeetingText)}
          value={meetingText.summary}
          variant='standard'
        />
        <DateFields dateFields={dateFields} setDateFields={setDateFields} />
        <div>
          invite team
          <FormControlLabel
            control={
              <Checkbox checked={inviteAll} onChange={handleInviteAll} />
            }
            label='Invite all'
          />
          <SelectAttendees
            attendees={attendees}
            setAttendees={setAttendees}
            projectMembers={projectMembers}
          />
        </div>
        <p>divider</p>
        <TextField
          label='Description'
          name='description'
          onChange={e => handleFormInputChange(e, setMeetingText)}
          value={meetingText.description}
          variant='standard'
        />
        <TextField
          label='Meeting link'
          name='meetingLink'
          onChange={e => handleFormInputChange(e, setMeetingText)}
          value={meetingText.meetingLink}
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={toggleMeetingModal}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
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
