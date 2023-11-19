import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { saveTicketStatusChange, saveUpdatedTicket } from 'utils/api/tickets'
import { CreateTicketTab } from './CreateTicketTab'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import { updateTicketStatus } from 'utils/redux/slices/projectSlice'
import {
  selectVisibleTickets,
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'

export const BoardColumns = () => {
  const { projectId } = useParams()
  const dispatch = useAppDispatch()
  const visibleTickets = useAppSelector(selectVisibleTickets)

  const handleOnDragEnd = async movingTicket => {
    if (movingTicket) {
      const targetTicketId = movingTicket.draggableId
      const initialStatus = movingTicket.source.droppableId
      const targetStatus = movingTicket.destination.droppableId

      if (initialStatus !== targetStatus) {
        const updatedTicket = await saveTicketStatusChange({
          projectId,
          targetStatus,
          targetTicketId,
          initialStatus,
        })

        if (updatedTicket) {
          dispatch(
            updateTicketStatus({
              initialStatus,
              updatedTicket,
            })
          )
        } else {
          // todo: display error toast
        }
      }
    }
  }

  // TODO: Add indexing to columns
  return (
    <div className={'AllTicketsDragDrop'}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.keys(visibleTickets).map(columnStatus => (
          <StatusColumn columnStatus={columnStatus} />
        ))}
      </DragDropContext>
    </div>
  )
}

const StatusColumn = ({ columnStatus }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)
  return (
    <Droppable droppableId={columnStatus} key={`column-${columnStatus}`}>
      {provided => (
        <div className='ticketStatusContainer'>
          <ColumnHeader columnStatus={columnStatus} />
          <CreateTicketTab columnStatus={columnStatus} />
          <ColumnTickets provided={provided} columnStatus={columnStatus} />
        </div>
      )}
    </Droppable>
  )
}

// Todo: rename provided?
export const ColumnTickets = ({ columnStatus, provided }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)
  return (
    <div
      className='content'
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {visibleTickets[columnStatus].map((ticketDetail, idx) => (
        <TicketTab idx={idx} ticketDetail={ticketDetail} />
      ))}
      {provided.placeholder}
    </div>
  )
}

export const ColumnHeader = ({ columnStatus }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)
  return (
    <div className='ticketStatusProgress'>
      <p>{formatTaskStatus(columnStatus)}</p>
      <span>{visibleTickets[columnStatus].length}</span>
    </div>
  )
}

export const TabDetails = ({ ticketDetail }) => {
  const { title } = ticketDetail
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    dispatch(setVisibleTicketDialog('edit'))
    dispatch(setTicketFields({ ...ticketDetail }))
  }

  return (
    <div onClick={handleOpenModal} className='ticketDetailOpenModal'>
      <div>
        <h3>{title}</h3>
      </div>
    </div>
  )
}

export const TicketTab = ({ idx, ticketDetail }) => {
  return (
    <Draggable
      key={ticketDetail._id}
      draggableId={ticketDetail._id}
      index={idx}
    >
      {provided => (
        <div
          className='ticketContainer'
          id={ticketDetail._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TabDetails ticketDetail={ticketDetail} />
        </div>
      )}
    </Draggable>
  )
}

const formatTaskStatus = (status: string) => {
  switch (status) {
    case 'toDo':
      return 'To Do'
    case 'inProgress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    case 'underReview':
      return 'Under Review'
    default:
      return status
  }
}
