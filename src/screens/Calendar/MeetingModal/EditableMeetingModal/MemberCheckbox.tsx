import { useEffect, useState } from 'react'
import { determineUserAvailability } from 'utils/functions/determineUserAvailability'
import { MeetingAvailability } from './MeetingAvailability'
import { Checkbox } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import '../styles/MemberCheckbox.scss'
import { generateDefaultPicture } from 'utils/helpers'

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
  }, [dateFields.start, dateFields.end, dateFields.eventTimezone])

  let availabilityText = ''
  if (isAvailable === 'available') {
    availabilityText = 'Available'
  } else if (isAvailable === 'partial') {
    availabilityText = 'Partially available'
  } else {
    availabilityText = 'Unavailable'
  }

  const defaultImageURL = generateDefaultPicture(
    currMember.firstName,
    currMember.lastName
  )

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
          sx={checkboxStyle}
        />
        <ListItemAvatar>
          <Avatar src={currMember.profilePicture || defaultImageURL} />
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
  '& .MuiSvgIcon-root': {
    fill: '#1A237E',
  },
}
