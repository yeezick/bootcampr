import { useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { checkIfAllMembersInvited, removeAuthUserFromList } from 'utils/helpers'
import './MeetingModal'

export const SelectAttendees = ({
  authUser,
  attendees,
  inviteAll,
  handleInviteAll,
  setAttendees,
  toggleInviteAll,
  projectMembers,
}) => {
  const filteredMembers = removeAuthUserFromList(projectMembers, authUser)
  /** Context
   * Unselect inviteAll checkbox if user has unselected members
   */
  useEffect(() => {
    checkIfAllMembersInvited(
      attendees,
      projectMembers,
      inviteAll,
      toggleInviteAll
    )
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
            {filteredMembers.map(currMember => (
              <div key={`select-member-${currMember._id}`}>
                <MemberCheckbox
                  attendees={attendees}
                  currMember={currMember}
                  setAttendees={setAttendees}
                />
              </div>
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
      label={`${currMember.firstName} ${currMember.lastName}`}
    />
  )
}
