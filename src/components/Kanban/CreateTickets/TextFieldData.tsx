import React from 'react'
import '../Ticket.scss'
import { Icon, TextField } from '@mui/material'

const TextFieldData = ({
  name,
  handleOnChange,
  placeholderText,
  detailIcon,
  text,
}) => {
  return (
    <div className='EditableText'>
      <div className='EditableTextIconText'>
        <Icon>{detailIcon}</Icon>
        <h4>{text}</h4>
      </div>
      <TextField
        className='EditableTextTextField'
        id='outlined-basic'
        variant='outlined'
        placeholder={placeholderText}
        name={name}
        onChange={handleOnChange}
      />
    </div>
  )
}
export default TextFieldData