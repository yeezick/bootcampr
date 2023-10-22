import { useParams } from 'react-router-dom'
import { CreateTicket } from '../CreateTickets/CreateTicket'
import kanbanImage from '../svg/bootcampr.png'
import { useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'

export const NoTicketsCreated = ({ getAllTicket, setGetAllTicket }) => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const { id } = useParams()

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
        <div>
          <CreateTicket
            projectId={id}
            setGetAllTicket={setGetAllTicket}
            getAllTicket={getAllTicket}
            ticketsStatus={'to Do'}
            buttonText=' Created first task'
            buttonClassName='button2'
          />
        </div>
      </div>
    </div>
  )
}

// Todo: convert createTicket button here into reusable MUI button
