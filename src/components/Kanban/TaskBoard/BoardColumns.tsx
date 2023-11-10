import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import {
  KeyOfTicketStatusType,
  TaskInterface,
  TicketInterface,
  TicketStatusChangeFunc,
} from 'interfaces'
import { updateTicketInformationAndStatus } from 'utils/api/tickets'
import { CreateTicketTab } from '../CreateTickets/CreateTicket'
import {
  concatenatedString,
  splitCamelCaseToWords,
} from 'utils/helpers/stringHelpers'
import { TicketDetail } from '../TicketDetail/TicketDetail'
import { useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import {
  setVisibleTickets,
  selectVisibleTickets,
} from 'utils/redux/slices/taskBoardSlice'

export const BoardColumns = () => {
  // remove dep on getAllTicket => source from redux
  const getAllTicket = useAppSelector(selectVisibleTickets)
  const setGetAllTicket = setVisibleTickets
  const { id } = useParams()

  const handleOnDragEnd = movingTicket => {
    if (movingTicket) {
      const ticketId = movingTicket.draggableId
      const initialStatus = movingTicket.source.droppableId
      const targetStatus = movingTicket.destination.droppableId

      // Check if initialStatus and targetStatus are not the same
      // find the ticket to change
      // call ticketStatusChange
      if (initialStatus !== targetStatus) {
        // if initialStatus is not the same as targetStatus => change status

        const ticketToChange = getAllTicket[initialStatus].find(
          ticket => ticket._id === ticketId
        )

        changeTicketStatus(initialStatus, targetStatus, ticketToChange)
      }
    }
  }

  const changeTicketStatus = (initialStatus, targetStatus, ticketToChange) => {
    // remove the ticket from its original status
    const { _id: changeTicketId } = ticketToChange
    const filteredInitialColumn = getAllTicket[initialStatus].filter(
      ticket => ticket._id !== changeTicketId
    )

    // add the ticket to the new status column
    const updatedTargetColumn = [
      ...getAllTicket[targetStatus],
      { ...ticketToChange, status: targetStatus },
    ]

    // update in redux
    // setGetAllTicket({
    //   ...getAllTicket,
    //   [initialStatus]: filteredInitialColumn,
    //   [targetStatus]: updatedTargetColumn,
    // })

    // call api to change ticket status
    updateTicketInformationAndStatus({
      projectId: id,
      newStatus: targetStatus,
      ticketId: changeTicketId,
      oldStatus: initialStatus,
    })
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
                    setVisibleTickets={setGetAllTicket}
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
export const ColumnTickets = ({
  provided,
  visibleTickets,
  setVisibleTickets,
  columnStatus,
}) => {
  const projectId = useAppSelector(selectProjectId)
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
                <TicketDetail
                  ticketDetail={ticketDetail}
                  getAllTicket={visibleTickets}
                  setGetAllTicket={setVisibleTickets}
                  ticketsStatus={columnStatus}
                  splitCamelCaseToWords={splitCamelCaseToWords}
                  concatenatedString={concatenatedString}
                  projectId={projectId}
                />
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
