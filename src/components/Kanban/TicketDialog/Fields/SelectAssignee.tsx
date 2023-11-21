import { handleReduxInputChange } from 'utils/helpers'
import '../../Ticket.scss'
import { Icon, MenuItem, Select } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectMembersAsTeam } from 'utils/redux/slices/projectSlice'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { useEffect } from 'react'

export const SelectAssignee = ({ detailIcon }) => {
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const { assignee } = useAppSelector(selectTicketFields)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!assignee) {
      dispatch(setTicketFields({ assignee: 'Unassigned' }))
    }
  }, [])

  const handleAssigneeChange = e =>
    handleReduxInputChange(e, dispatch, setTicketFields)

  return (
    <div className='UserAssignee'>
      {/* TODO: Turn into component */}
      <div className='UserAssigneeIconText'>
        <Icon>{detailIcon}</Icon>
        <h3>Assignee</h3>
      </div>
      {/*  */}
      <Select
        displayEmpty
        className='UserAssigneeUserInfo'
        name={'assignee'}
        onChange={handleAssigneeChange}
        sx={{ width: 250 }}
        value={assignee}
      >
        <MenuItem value='Unassigned'>
          <div className='user-card'>
            <img className='assignee-thumbnail' src='/default_profile.png' />
            <div className='assignee-metadata'>
              <h1>Unassigned</h1>
            </div>
          </div>
        </MenuItem>
        {projectMembers.map(member => (
          <MenuItem key={member._id} value={member._id}>
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
        ))}
      </Select>
    </div>
  )
}
