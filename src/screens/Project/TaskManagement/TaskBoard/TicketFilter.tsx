import { Radio } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { setVisibleTickets } from 'utils/redux/slices/taskBoardSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import '../styles/TicketFilter.scss'

export const TicketFilter = () => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const { _id: userId } = useAppSelector(selectAuthUser)
  const [viewAllTasks, setViewAllTasks] = useState(true)
  const [viewMyTasks, setViewMyTasks] = useState(false)
  const dispatch = useAppDispatch()

  const handleTaskFilterCheckbox = () => {
    setViewAllTasks(state => !state)
    setViewMyTasks(state => !state)
    dispatch(
      setVisibleTickets({
        changeVisibleTicketType: true,
        projectTracker,
        userId,
      })
    )
  }

  return (
    <div className='ticket-filter'>
      <div className='filter-option'>
        <Radio
          className='filter-radio'
          checked={viewAllTasks}
          onChange={handleTaskFilterCheckbox}
          name='view-all-tasks'
        />
        <p>All stories</p>
      </div>
      <div className='filter-option'>
        <Radio
          checked={viewMyTasks}
          className='filter-radio'
          onChange={handleTaskFilterCheckbox}
          name='view-my-tasks'
        />
        <p>My stories</p>
      </div>
    </div>
  )
}
