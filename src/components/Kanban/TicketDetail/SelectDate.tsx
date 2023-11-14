import React, { MutableRefObject, useRef } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { Icon } from '@mui/material'
import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'

type SelectDateProps = {
  dateRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const SelectDate = ({ handleOnChange }: SelectDateProps) => {
  const dateRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const { dueDate } = useAppSelector(selectTicketFields)
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
          defaultValue={dueDate}
        />
      </div>
    </div>
  )
}
