import React from 'react'
import '../Ticket.scss'
import { Icon, MenuItem, MenuItemProps, Select } from '@mui/material'
import { SelectAssignee } from '../CreateTickets/SelectAssignee'

export const UserAssignee = ({
  userName = 'Unassigned',
  text,
  detailIcon,
  userImage = 'default',
  userRole = '',
}) => {
  console.log(text)

  return (
    <div className='UserAssignee'>
      <div className='UserAssigneeIconText'>
        <Icon>{detailIcon}</Icon>
        <h1>{text}</h1>
      </div>
      <div className='UserAssigneeUserInfo'>
        <div>
          <Select>
            <MenuItem value='Julia'>
              <div>
                <img className='assignee-thumbnail' src={userImage} alt='' />
              </div>
              Julia Dwyer
            </MenuItem>
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
