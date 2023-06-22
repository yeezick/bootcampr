import { useEffect, useState } from 'react'
import '../Ticket.scss'
import { Icon, MenuItem, MenuItemProps, Select } from '@mui/material'
import { SelectAssignee } from '../CreateTickets/SelectAssignee'
import { getMembersByProjectId } from 'utils/api'

export const UserAssignee = ({
  userName = 'Unassigned',
  text,
  detailIcon,
  userImage = 'default',
  userRole = '',
}) => {
  const [projectMembers, setProjectMembers] = useState([])

  const populateProjectMembers = async projectId => {
    const members = await getMembersByProjectId(projectId)
    setProjectMembers([...members.engineers, ...members.designers])
    console.log(members)
  }

  useEffect(() => {
    console.log('getting team members')
    populateProjectMembers('645c4cfee0e671226ea01a84')
  }, [])

  return (
    <div className='UserAssignee'>
      <div className='UserAssigneeIconText'>
        <Icon>{detailIcon}</Icon>
        <h1>{text}</h1>
      </div>
      <div>
        <div>
          <Select className='UserAssigneeUserInfo' sx={{ width: 250 }}>
            {projectMembers.map(member => {
              return (
                <MenuItem value={member}>
                  {/* <div>
                    <img className='assignee-thumbnail' src='' alt='' />
                  </div> */}
                  {member}
                </MenuItem>
              )
            })}
          </Select>
        </div>
        {/* <div>
          <p>{userName}</p>
          <p>{userRole}</p>
        </div> */}
      </div>
    </div>
  )
}
