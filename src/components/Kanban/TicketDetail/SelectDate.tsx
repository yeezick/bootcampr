import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { Icon } from '@material-ui/core'

type SelectDateProps = {
  dateRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const SelectDate = ({
  dateRef,
  defaultValue,
  handleOnChange,
}: SelectDateProps) => {
  return (
    <div className='dateContainer'>
      <div className='date-icon-container'>
        <Icon>
          <AiOutlineCalendar />
        </Icon>
        <h1>Due date</h1>
      </div>
      <div>
        <input
          className='dateContainerDate'
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
