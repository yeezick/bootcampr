import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import './MeetingModal'
import { useEffect } from 'react'

export const SelectAttendees = ({
  attendees,
  inviteAll,
  handleInviteAll,
  setAttendees,
  toggleInviteAll,
  projectMembers,
}) => {
  /** Context
   * Unselect inviteAll checkbox if user has unselected members
   */
  useEffect(() => {
    const invitedMembers = []
    for (const member in attendees) {
      if (attendees[member] === true) {
        invitedMembers.push(true)
      }
    }
    const allMembersInvited = invitedMembers.length === projectMembers.length
    if (inviteAll && !allMembersInvited) {
      toggleInviteAll(false)
    } else if (!inviteAll && allMembersInvited) {
      toggleInviteAll(true)
    }
  }, [attendees])

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
            {projectMembers.map(currMember => (
              <MemberCheckbox
                attendees={attendees}
                currMember={currMember}
                setAttendees={setAttendees}
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

const MemberCheckbox = ({ attendees, currMember, setAttendees }) => {
  const handleMemberSelection = e => {
    setAttendees(state => {
      return { ...state, [e.target.name]: e.target.checked }
    })
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={attendees[currMember.email] || false}
          onChange={handleMemberSelection}
          name={currMember.email}
        />
      }
      key={`select-member-${currMember._id}`}
      label={`${currMember.firstName} ${currMember.lastName}`}
    />
  )
}