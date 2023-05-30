import React from 'react'
import '../Ticket.scss'
import { Icon } from '@material-ui/core'
const EditableText = ({ editRef, ticketDetail, text, detailIcon }) => {
  return (
    <div className='EditableText'>
      <div className='EditableText-icon-text'>
        <Icon>{detailIcon}</Icon>
        <h4>{text}</h4>
      </div>
      <blockquote>
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
