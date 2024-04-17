import { useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { checkIfAllMembersInvited } from 'utils/helpers'
import '../styles/SelectAttendees.scss'
import { MemberCheckbox } from './MemberCheckbox'
import { People } from '@mui/icons-material'
import List from '@mui/material/List'
import {
  selectCalendarId,
  selectMembersAsTeam,
} from 'utils/redux/slices/projectSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserEmail } from 'utils/redux/slices/userSlice'

export const SelectAttendees = ({
  attendees,
  dateFields,
  inviteAll,
  handleInviteAll,
  setAttendees,
  toggleInviteAll,
}) => {
  const authUserEmail = useAppSelector(selectUserEmail)
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const calendarId = useAppSelector(selectCalendarId)
  const isSandboxEvent = calendarId === 'sandbox'
  const filteredMembers = projectMembers.filter(members => {
    if (isSandboxEvent) {
      return members.email !== 'star@struck.com'
    } else {
      return members.email !== authUserEmail
    }
  })

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
              <Checkbox
                checked={inviteAll}
                onChange={handleInviteAll}
                sx={checkboxStyle}
              />
            }
            label='Invite all'
          />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredMembers.map(currMember => (
              <MemberCheckbox
                attendees={attendees}
                currMember={currMember}
                dateFields={dateFields}
                setAttendees={setAttendees}
              />
            ))}
          </List>
        </div>
      </div>
    </>
  )
}

const checkboxStyle = {
  '& .MuiSvgIcon-root': {
    fill: '#1A237E',
  },
  paddingTop: '0px',
}
