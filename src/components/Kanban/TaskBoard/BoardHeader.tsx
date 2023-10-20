import { Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import { filterOutTickets } from 'utils/helpers/taskHelpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

export const BoardHeader = ({ visibleTickets, setVisibleTickets }) => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const { _id: userId } = useAppSelector(selectAuthUser)
  const [viewAllTasks, setViewAllTasks] = useState(false)
  const [viewMyTasks, setViewMyTasks] = useState(false)

  useEffect(() => {
    handleAllTasksCheckbox()
  }, [])

  const handleAllTasksCheckbox = () => {
    if (viewAllTasks === false) {
      setViewAllTasks(true)
      setViewMyTasks(false)
      setVisibleTickets(projectTracker)
    } else {
      handleMyTasksCheckbox()
    }
  }

  const handleMyTasksCheckbox = () => {
    if (viewMyTasks === false) {
      setViewAllTasks(false)
      setViewMyTasks(true)

      if (visibleTickets) {
        setVisibleTickets(filterOutTickets(visibleTickets, userId))
      }
    } else {
      handleAllTasksCheckbox()
    }
  }

  return (
    <div>
      <div className='Project-header'>
        <h1>Kanban board</h1>
      </div>
      <div className='Project-filter'>
        <span>
          <Checkbox checked={viewAllTasks} onClick={handleAllTasksCheckbox} />
          <p>All tasks</p>
        </span>
        <span>
          <Checkbox checked={viewMyTasks} onClick={handleMyTasksCheckbox} />
          <p>My tasks</p>
        </span>
      </div>
    </div>
  )
}
