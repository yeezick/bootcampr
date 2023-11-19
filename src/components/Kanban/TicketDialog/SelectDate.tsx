import React, { MutableRefObject, useRef } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { Icon } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectTicketFields,
  setTicketFields,
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'

type SelectDateProps = {
  dateRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const SelectDate = () => {
  const dispatch = useAppDispatch()
  const handleDateChange = e =>
    handleReduxInputChange(e, dispatch, setTicketFields)
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
          onChange={handleDateChange}
          ref={dateRef}
          defaultValue={dueDate}
        />
      </div>
    </div>
  )
}
