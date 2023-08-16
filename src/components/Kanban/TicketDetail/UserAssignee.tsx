import { useEffect, useState } from 'react'
import '../Ticket.scss'
import { Icon, MenuItem, Select } from '@mui/material'

export const UserAssignee = ({
  text,
  detailIcon,
  projectMembers,
  setAssignee,
  assignee,
}) => {
  const [newAssignee, setNewAssignee] = useState(assignee)

  const handleChange = e => {
    setNewAssignee(e.target.value)
    setAssignee(e.target.value)
  }

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
        value={newAssignee}
        onChange={handleChange}
      >
        <MenuItem value='Unassigned'>
          <div className='user-card'>
            <img
              className='assignee-thumbnail'
              src='/default_profile.png'
            ></img>
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
                ></img>
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
