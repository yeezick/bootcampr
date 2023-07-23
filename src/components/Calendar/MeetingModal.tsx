import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { useEffect, useRef, useState } from 'react'
import { getProjectMembers } from 'utils/api'
import { useSelector } from 'react-redux'
import { selectProjectId } from 'utils/redux/slices/userSlice'
import { DateFieldsInterface, StringToBooleanObject } from 'interfaces'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProjectMembersAsTeam } from 'utils/redux/slices/projectSlice'

dayjs.extend(utc)
dayjs.extend(timezone)

export const MeetingModal = props => {
  const {
    toggleMeetingModal,
    visibleMeeting,
    onClose,
    value: valueProp,
    open,
    ...other
  } = props
  const [meetingText, setMeetingText] = useState({
    summary: '',
    description: '',
    meetingLink: '',
  })
  const [dateFields, setDateFields] = useState<DateFieldsInterface>({
    date: dayjs(),
    start: dayjs(),
    timeZone: dayjs.tz.guess(),
    end: dayjs(),
  })
  const [attendees, setAttendees] = useState<StringToBooleanObject>({})
  const [inviteAll, toggleInviteAll] = useState(false)
  const radioGroupRef = useRef(null)
  const projectMembers = useAppSelector(selectProjectMembersAsTeam)

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus()
    }
  }

  const handleMeetingText = e => {
    const { name, value } = e.target
    setMeetingText({ ...meetingText, [name]: value })
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

  const handleSubmit = () => {
    // Package request to fit calendar event
    // Fetch calendarId from backend during submission
    console.log({ dateFields, meetingText, attendees })
    const { end, start, timeZone } = dateFields
    const { description, summary } = meetingText
    const attendeeList = []

    for (const email in attendees) {
      if (attendees[email] === true) {
        attendeeList.push({ email })
      }
    }

    const requestBody = {
      description,
      summary,
      start: {
        dateTime: start,
        timeZone,
      },
      end: {
        dateTime: end,
        timeZone,
      },
      attendees: attendeeList,
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
      {...other}
    >
      <DialogContent>
        <TextField
          label='Title'
          name='summary'
          placeholder='Add title'
          onChange={handleMeetingText}
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
          onChange={handleMeetingText}
          value={meetingText.description}
          variant='standard'
        />
        <TextField
          label='Meeting link'
          name='meetingLink'
          onChange={handleMeetingText}
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

const DateFields = ({ dateFields, setDateFields }) => {
  const handleDate = newDate => setDateFields({ ...dateFields, date: newDate })
  const handleFrom = newDate => setDateFields({ ...dateFields, start: newDate })
  const handleTo = newDate => setDateFields({ ...dateFields, end: newDate })
  const handleTimeZone = newTimeZone =>
    setDateFields({ ...dateFields, timeZone: newTimeZone })
  return (
    <div>
      <DatePicker
        value={dateFields.date}
        label='date picker'
        onChange={handleDate}
      />
      <TimePicker
        value={dateFields.start}
        label='time picker'
        onChange={handleFrom}
      />
      <span>-</span>
      <TimePicker
        value={dateFields.end}
        label='time picker'
        onChange={handleTo}
      />
      <FormControl>
        <InputLabel>TimeZone</InputLabel>
        <Select onChange={handleTimeZone}>
          {usTimeZones.map(timeZone => (
            <MenuItem key={timeZone.value}>{timeZone.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const SelectAttendees = ({ attendees, setAttendees, projectMembers }) => {
  const handleMemberSelection = e => {
    setAttendees(state => {
      return { ...state, [e.target.name]: e.target.checked }
    })
  }

  if (projectMembers) {
    return (
      <FormGroup>
        {projectMembers.map(member => (
          <FormControlLabel
            control={
              <Checkbox
                checked={attendees[member.email] || false}
                onChange={handleMemberSelection}
                name={member.email}
              />
            }
            key={`select-member-${member._id}`}
            label={`${member.firstName} ${member.lastName}`}
          />
        ))}
      </FormGroup>
    )
  } else return null
}

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const usTimeZones = [
  { value: 'America/Puerto_Rico', name: 'Puerto Rico (Atlantic)' },
  { value: 'America/New_York', name: 'New York (Eastern)' },
  { value: 'America/Chicago', name: 'Chicago (Central)' },
  { value: 'America/Denver', name: 'Denver (Mountain)' },
  { value: 'America/Phoenix', name: 'Phoenix (MST)' },
  { value: 'America/Los_Angeles', name: 'Los Angeles (Pacific)' },
  { value: 'America/Anchorage', name: 'Anchorage (Alaska)' },
  { value: 'Pacific/Honolulu', name: 'Honolulu (Hawaii)' },
]
