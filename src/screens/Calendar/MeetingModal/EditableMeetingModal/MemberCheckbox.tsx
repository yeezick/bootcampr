import { Checkbox, FormControlLabel } from '@mui/material'
import { MeetingAvailability } from './MeetingAvailability'
import '../styles/MemberCheckbox.scss'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

export const MemberCheckbox = ({
  attendees,
  currMember,
  dateFields,
  setAttendees,
}) => {
  const handleMemberSelection = e => {
    setAttendees(state => {
      return { ...state, [e.target.name]: e.target.checked }
    })
  }

  return (
    <div key={`select-member-${currMember._id}`} className='member-checkbox'>
      {/* <FormControlLabel
        control={
          <Checkbox
            checked={attendees[currMember.email] || false}
            onChange={handleMemberSelection}
            name={currMember.email}
          />
        }
        label={`${currMember.firstName} ${currMember.lastName}`}
        /> */}

      <ListItem sx={{ padding: '0px', margin: '0px', width: '100%' }}>
        <Checkbox
          checked={attendees[currMember.email] || false}
          onChange={handleMemberSelection}
          name={currMember.email}
        />
        <ListItemAvatar>
          <Avatar>
            <img src={currMember.defaultProfilePicture} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${currMember.firstName} ${currMember.lastName}`}
          secondary={currMember.role}
        />
      </ListItem>
      <MeetingAvailability currMember={currMember} dateFields={dateFields} />
    </div>
  )
}
