import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { Icon } from '@material-ui/core'

// AiOutlineCalendar
type SelectDateProps = {
  dateRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SelectDate = ({
  dateRef,
  defaultValue,
  handleOnChange,
}: SelectDateProps) => {
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
          name='dueDate'
          onChange={handleOnChange}
          ref={dateRef}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}

export default SelectDate
