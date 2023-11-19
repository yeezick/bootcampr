import { Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import { filterUserTickets } from 'utils/helpers/taskHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { setVisibleTickets } from 'utils/redux/slices/taskBoardSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

export const BoardHeader = () => {
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
    <div>
      <div className='Project-header'>
        <h1>Kanban board</h1>
      </div>
      <div className='Project-filter'>
        <span>
          <Checkbox checked={viewAllTasks} onClick={handleTaskFilterCheckbox} />
          <p>All tasks</p>
        </span>
        <span>
          <Checkbox checked={viewMyTasks} onClick={handleTaskFilterCheckbox} />
          <p>My tasks</p>
        </span>
      </div>
    </div>
  )
}
