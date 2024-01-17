import { Checkbox, FormControlLabel } from '@mui/material'
import { MeetingAvailability } from './MeetingAvailability'
import '../styles/MemberCheckbox.scss'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { determineUserAvailability } from 'utils/functions/determineUserAvailability'

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

  const [isAvailable, setIsAvailable] = useState('unavailable')

  useEffect(() => {
    determineUserAvailability(currMember, dateFields, setIsAvailable)
  }, [dateFields.start, dateFields.end])

  let availabilityText = ''
  if (isAvailable === 'available') {
    availabilityText = 'Available'
  } else if (isAvailable === 'partial') {
    availabilityText = 'Partially available'
  } else {
    availabilityText = 'Unavailable'
  }

  return (
    <div
      key={`select-member-${currMember._id}`}
      className={
        isAvailable === 'unavailable'
          ? 'member-checkbox-unavailable'
          : 'member-checkbox'
      }
    >
      <ListItem sx={{ padding: '0px', margin: '0px', width: '100%' }}>
        <Checkbox
          checked={attendees[currMember.email] || false}
          onChange={handleMemberSelection}
          name={currMember.email}
          sx={{ checkboxStyle }}
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
      <MeetingAvailability availabilityText={availabilityText} />
    </div>
  )
}

const checkboxStyle = {
  '&$checked': {
    fill: 'red',
  },
}
