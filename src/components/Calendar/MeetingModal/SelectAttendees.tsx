import { useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { checkIfAllMembersInvited } from 'utils/helpers'
import './styles/SelectAttendees.scss'
import { MemberCheckbox } from './MemberCheckbox'

export const SelectAttendees = ({
  attendees,
  dateFields,
  inviteAll,
  handleInviteAll,
  setAttendees,
  toggleInviteAll,
  projectMembers,
}) => {
  /* Unselect inviteAll checkbox if user has unselected members */
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
            {projectMembers.map(currMember => (
              <MemberCheckbox
                attendees={attendees}
                currMember={currMember}
                dateFields={dateFields}
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
