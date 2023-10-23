import '../Ticket.scss'
import { Icon, MenuItem, Select } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectMembersAsTeam } from 'utils/redux/slices/projectSlice'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'

export const AssignUser = ({ text, detailIcon }) => {
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const { assignee } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  const handleAssigneeChange = e =>
    dispatch(setTicketFields({ assignee: e.target.value }))

  return (
    <div className='UserAssignee'>
      <div className='UserAssigneeIconText'>
        <Icon>{detailIcon}</Icon>
        <h1>{text}</h1>
      </div>
      <Select
        displayEmpty
        className='UserAssigneeUserInfo'
        sx={{ width: 250 }}
        value={assignee}
        onChange={handleAssigneeChange}
      >
        <MenuItem value='Unassigned'>
          <div className='user-card'>
            <img className='assignee-thumbnail' src='/default_profile.png' />
            <div className='assignee-metadata'>
              <h1>Unassigned</h1>
            </div>
          </div>
        </MenuItem>
        {projectMembers.map(member => {
          return (
            <MenuItem value={member._id}>
              <div className='user-card'>
                <img
                  className='assignee-thumbnail'
                  src={`${member.profilePicture}`}
                />
                <div className='assignee-metadata'>
                  <h1>
                    {member.firstName} {member.lastName}
                  </h1>
                  <h2>{member.role}</h2>
                </div>
              </div>
            </MenuItem>
          )
        })}
      </Select>
    </div>
  )
}
