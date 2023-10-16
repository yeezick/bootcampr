import { Checkbox } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

export const BoardHeader = ({
  getAllTicket,
  setGetAllTicket,
  projectTracker,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const [viewAllTasks, setViewAllTasks] = useState(false)
  const [viewMyTasks, setViewMyTasks] = useState(false)

  const getAllTickets = () => {
    setViewAllTasks(true)
    setViewAllTasks(false)
    setGetAllTicket(projectTracker.projectTracker)
  }

  const filterOutTickets = objectKey => {
    return getAllTicket[objectKey].filter(
      assign => assign.assignee === authUser._id
    )
  }
  const onlyGetMyTicket = () => {
    setViewAllTasks(false)
    setViewMyTasks(true)

    if (getAllTicket) {
      const newProjectDetail = {
        projectTracker: {
          toDo: filterOutTickets('toDo'),
          inProgress: filterOutTickets('inProgress'),
          underReview: filterOutTickets('underReview'),
          completed: filterOutTickets('completed'),
        },
      }
      setGetAllTicket({
        ...newProjectDetail.projectTracker,
      })
    }
  }

  return (
    <div>
      <div className='Project-header'>
        <h1>Kanban board</h1>
      </div>
      <div className='Project-filter'>
        <span>
          <Checkbox checked={viewAllTasks} onClick={getAllTickets} />
          <p>All tasks</p>
        </span>
        <span>
          <Checkbox checked={viewMyTasks} onClick={onlyGetMyTicket} />
          <p>My tasks</p>
        </span>
      </div>
    </div>
  )
}
