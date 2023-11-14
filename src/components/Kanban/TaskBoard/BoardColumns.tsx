import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { KeyOfTicketStatusType, TicketInterface } from 'interfaces'
import { updateTicketStatus } from 'utils/api/tickets'
import { CreateTicketTab } from '../CreateTickets/CreateTicket'
import { TicketDetail } from '../TicketDetail/TicketDetail'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import { changeTicketStatus } from 'utils/redux/slices/projectSlice'
import {
  setVisibleTickets,
  selectVisibleTickets,
} from 'utils/redux/slices/taskBoardSlice'

export const BoardColumns = () => {
  // remove dep on getAllTicket => source from redux
  const getAllTicket = useAppSelector(selectVisibleTickets)
  const setGetAllTicket = setVisibleTickets
  const dispatch = useAppDispatch()
  const { projectId } = useParams()

  const handleOnDragEnd = async movingTicket => {
    if (movingTicket) {
      const targetTicketId = movingTicket.draggableId
      const initialStatus = movingTicket.source.droppableId
      const targetStatus = movingTicket.destination.droppableId

      if (initialStatus !== targetStatus) {
        const updatedTicket = await updateTicketStatus({
          projectId,
          targetStatus,
          targetTicketId,
          initialStatus,
        })

        if (updatedTicket) {
          dispatch(
            changeTicketStatus({
              initialStatus,
              targetStatus,
              targetTicketId,
              updatedTicket,
            })
          )
        } else {
          // todo: display error toast
        }
      }
    }
  }

  return (
    <div className={'AllTicketsDragDrop'}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {getAllTicket &&
          Object.keys(getAllTicket)?.map((columnStatus: string, i) => (
            <Droppable
              droppableId={columnStatus}
              key={`column-${columnStatus}`}
            >
              {provided => (
                <div className='ticketStatusContainer' key={i}>
                  <ColumnHeader
                    visibleTickets={getAllTicket}
                    columnStatus={columnStatus}
                  />
                  <CreateTicketTab columnStatus={columnStatus} />
                  <ColumnTickets
                    provided={provided}
                    columnStatus={columnStatus}
                    visibleTickets={getAllTicket}
                  />
                </div>
              )}
            </Droppable>
          ))}
      </DragDropContext>
    </div>
  )
}

// Todo: rename provided?
export const ColumnTickets = ({ provided, visibleTickets, columnStatus }) => {
  return (
    <div
      className='content'
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {visibleTickets[columnStatus as KeyOfTicketStatusType]?.map(
        (ticketDetail: TicketInterface, idx) => (
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
                <TicketDetail />
              </div>
            )}
          </Draggable>
        )
      )}
      {provided.placeholder}
    </div>
  )
}

export const ColumnHeader = ({ visibleTickets, columnStatus }) => {
  return (
    <div className='ticketStatusProgress'>
      <p>{formatTaskStatus(columnStatus)}</p>
      <span>{visibleTickets[columnStatus].length}</span>
    </div>
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
