import React from 'react'
import '../Ticket.scss'
import { Icon } from '@mui/material'

const UserAssignee = ({ userName, text, detailIcon, userImage, userRole }) => {
  return (
    <div className='UserAssignee'>
      <div className='UserAssignee-icon-text'>
        <Icon>{detailIcon}</Icon>
        <h1>{text}</h1>
      </div>
      <div className='UserAssignee-user-info'>
        <div>
          <img
            src='https://issuetrackerimage.s3.amazonaws.com/0535deeb-4388-4bfd-b191-4c69d1e81cbc'
            alt=''
          />
        </div>
        <div>
          <p>{userName}</p>
          <p>{userRole}</p>
        </div>
      </div>
    </div>
  )
}

export default UserAssignee
