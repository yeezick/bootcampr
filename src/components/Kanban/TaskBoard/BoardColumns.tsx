import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import {
  KeyOfTicketStatusType,
  TaskInterface,
  TicketInterface,
  TicketStatusChangeFunc,
} from 'interfaces'
import { updateTicketInformationAndStatus } from 'utils/api/tickets'
import { CreateTicket } from '../CreateTickets/CreateTicket'
import {
  concatenatedString,
  splitCamelCaseToWords,
} from 'utils/helpers/stringHelpers'
import { TicketDetail } from '../TicketDetail/TicketDetail'
import { useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import { selectProject } from 'utils/redux/slices/projectSlice'

export const BoardColumns = ({ getAllTicket, setGetAllTicket }) => {
  const { members } = useAppSelector(selectProject)
  const { id } = useParams()

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
          Object.keys(getAllTicket)?.map((ticketsStatus: string, i) => (
            <Droppable droppableId={ticketsStatus} key={ticketsStatus}>
              {provided => (
                <div className='ticketStatusContainer' key={i}>
                  <div className='ticketStatusProgress'>
                    <p>{formatTaskStatus(ticketsStatus)}</p>
                    <span>{getAllTicket[ticketsStatus].length}</span>
                  </div>
                  <div>
                    <CreateTicket
                      projectId={id}
                      setGetAllTicket={setGetAllTicket}
                      getAllTicket={getAllTicket}
                      ticketsStatus={splitCamelCaseToWords(ticketsStatus)}
                      buttonText='Create task'
                    />
                  </div>
                  <div
                    className='content'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {getAllTicket[ticketsStatus as KeyOfTicketStatusType]?.map(
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
                                getAllTicket={getAllTicket}
                                setGetAllTicket={setGetAllTicket}
                                ticketsStatus={ticketsStatus}
                                splitCamelCaseToWords={splitCamelCaseToWords}
                                concatenatedString={concatenatedString}
                                projectId={id}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
      </DragDropContext>
    </div>
  )
}
