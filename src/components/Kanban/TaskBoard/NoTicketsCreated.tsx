import kanbanImage from '../svg/bootcampr.png'
import { useAppDispatch } from 'utils/redux/hooks'
import { setVisibleTicketDialog } from 'utils/redux/slices/taskBoardSlice'

export const NoTicketsCreated = () => {
  return (
    <div className='AllTicketsDragDropNoTicket'>
      <div className='ifTheresNoTicket'>
        <div className='ifTheresNoTicketImageContainer'>
          <img src={kanbanImage} alt='kanbanImage' />
        </div>
        <div>
          <h1>Your team hasn’t created any tasks.</h1>
        </div>
        <div className='textBox'>
          <p>
            Maximize efficiency and visualize work by tracking tasks here. Move
            the task through the board from To Do to Complete. You’ll be one
            step closer to shipping a live product with each completed task!
          </p>
        </div>
        <CreateTicketButton />
      </div>
    </div>
  )
}

export const CreateTicketButton = () => {
  const dispatch = useAppDispatch()
  const openCreateTicketDialog = () =>
    dispatch(setVisibleTicketDialog('create'))
  return <button onClick={openCreateTicketDialog}>CREATE A TASK</button>
}

// Todo: convert createTicket button here into reusable MUI button
