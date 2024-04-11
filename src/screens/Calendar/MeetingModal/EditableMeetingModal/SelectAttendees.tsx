import { useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { checkIfAllMembersInvited } from 'utils/helpers'
import '../styles/SelectAttendees.scss'
import { MemberCheckbox } from './MemberCheckbox'
import { People } from '@mui/icons-material'
import List from '@mui/material/List'

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

  return (
    <>
      <People className='people-icon' />
      <div className='select-attendees-section'>
        <div className='select-attendees-wrapper'>
          <FormControlLabel
            control={
              <Checkbox checked={inviteAll} onChange={handleInviteAll} />
            }
            label='Invite all'
          />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {projectMembers.map(currMember => (
              <MemberCheckbox
                attendees={attendees}
                currMember={currMember}
                dateFields={dateFields}
                setAttendees={setAttendees}
                key={currMember._id}
              />
            ))}
          </List>
        </div>
      </div>
    </>
  )
}
