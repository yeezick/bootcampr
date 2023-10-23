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

export const BoardColumns = ({ getAllTicket, setGetAllTicket }) => {
  const { id } = useParams()

  const handleOnDragEnd = movingTicket => {
    if (movingTicket) {
      const ticketId = movingTicket.draggableId
      const sourceCategory: KeyOfTicketStatusType =
        movingTicket.source?.droppableId
      const targetCategory: KeyOfTicketStatusType =
        movingTicket.destination?.droppableId
      if (sourceCategory && targetCategory) {
        const item: TicketInterface | undefined = getAllTicket[
          sourceCategory as KeyOfTicketStatusType
        ]?.find(item => item._id?.toString() === ticketId)

        if (sourceCategory !== targetCategory && item) {
          ticketStatusChange({
            sourceCategory,
            targetCategory,
            item,
            ticketId,
          })
        }
      }
    }
  }

  const ticketStatusChange = ({
    sourceCategory,
    targetCategory,
    item,
    ticketId,
  }: TicketStatusChangeFunc) => {
    const removeFromSection: TaskInterface[] | undefined = getAllTicket[
      sourceCategory as KeyOfTicketStatusType
    ].filter((newStatus: TicketInterface) => newStatus._id !== ticketId)
    const addToNewSection = [
      ...getAllTicket[targetCategory as KeyOfTicketStatusType],
      { ...item, status: targetCategory },
    ]

    setGetAllTicket({
      ...getAllTicket,
      [sourceCategory as KeyOfTicketStatusType]: [
        ...(removeFromSection as TaskInterface[]),
      ],
      [targetCategory]: [...addToNewSection],
    })

    updateTicketInformationAndStatus({
      projectId: id,
      newStatus: targetCategory,
      ticketId: ticketId,
      oldStatus: sourceCategory,
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
