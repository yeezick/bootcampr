import { Checkbox, FormControlLabel } from '@mui/material'
import { MeetingAvailability } from './MeetingAvailability'
import '../styles/MemberCheckbox.scss'

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
      <FormControlLabel
        control={
          <Checkbox
            checked={attendees[currMember.email] || false}
            onChange={handleMemberSelection}
            name={currMember.email}
          />
        }
        label={`${currMember.firstName} ${currMember.lastName}`}
      />
      <MeetingAvailability currMember={currMember} dateFields={dateFields} />
    </div>
  )
}
