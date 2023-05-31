import React from 'react'
import '../Ticket.scss'
import { TextField } from '@mui/material'

const TextFieldData = ({ name, handleOnChange, placeholderText }) => {
  return (
    <div className='EditableText'>
      <div className='EditableText-icon-text'>
        {/* <Icon>{detailIcon}</Icon> */}
        {/* <h4>{text}</h4> */}
      </div>
      <TextField
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
