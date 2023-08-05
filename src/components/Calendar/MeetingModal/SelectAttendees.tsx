import { People } from '@mui/icons-material'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import './MeetingModal'

export const SelectAttendees = ({
  attendees,
  inviteAll,
  handleInviteAll,
  setAttendees,
  projectMembers,
}) => {
  const handleMemberSelection = e => {
    setAttendees(state => {
      return { ...state, [e.target.name]: e.target.checked }
    })
  }

  if (projectMembers) {
    return (
      <div className='select-attendees-section'>
        <div className='select-attendees-wrapper'>
          <FormControlLabel
            control={
              <Checkbox checked={inviteAll} onChange={handleInviteAll} />
            }
            label='Invite all'
          />
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
          <span className='select-attendees-helper-text'>
            Email invite will be sent to selected members
          </span>
        </div>
      </div>
    )
  } else return null
}
