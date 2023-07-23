import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

export const SelectAttendees = ({
  attendees,
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
