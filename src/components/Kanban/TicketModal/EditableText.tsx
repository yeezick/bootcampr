import React from 'react'
import '../Ticket.scss'
import { Icon } from '@mui/material'

// TODO: Redo with MUI
const EditableText = ({ editRef, ticketDetail, text, detailIcon }) => {
  return (
    <div className='EditableText'>
      <div className='EditableTextIconText'>
        <Icon>{detailIcon}</Icon>
        <h4>{text}</h4>
      </div>
      <blockquote className='blockquote-text'>
        <p
          contentEditable='true'
          ref={editRef}
          suppressContentEditableWarning={true}
        >
          {ticketDetail}
        </p>
      </blockquote>
    </div>
  )
}

export default EditableText
