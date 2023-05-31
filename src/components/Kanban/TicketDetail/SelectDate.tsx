import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { Icon } from '@material-ui/core'

// AiOutlineCalendar
const SelectDate = ({ dateRef, defaultValue }) => {
  return (
    <div className='date-container'>
      <div className='date-icon-container'>
        <Icon>
          <AiOutlineCalendar />
        </Icon>
        <h1>Due date</h1>
      </div>
      <div>
        <input
          className='date-container-date'
          type='date'
          name='date'
          ref={dateRef}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}

export default SelectDate
