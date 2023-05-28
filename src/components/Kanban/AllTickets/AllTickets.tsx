import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreateTicket } from 'components/Kanban'
import { TicketDetail } from 'components/Kanban'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

import {
  TicketInterface,
  KeyOfTicketStatusType,
  TaskInterface,
  TicketStatusChangeFunc,
} from 'interfaces'
import { updateTicketInformationAndStatus } from 'utils/api/tickets'
import '../Ticket.scss'

export const AllTickets = ({ projectTracker }) => {
  const { id } = useParams()

  const [getAllTicket, setGetAllTicket] = useState(
    projectTracker?.projectTracker
  )
  const handleOnDragEnd = movingTicket => {
    // Check if movingTicket exists
    if (movingTicket) {
      const ticketId = movingTicket.draggableId
      const sourceCategory: KeyOfTicketStatusType =
        movingTicket.source?.droppableId
      const targetCategory: KeyOfTicketStatusType =
        movingTicket.destination?.droppableId

      // Check if sourceCategory and targetCategory exist
      if (sourceCategory && targetCategory) {
        const item: TicketInterface | undefined = getAllTicket[
          sourceCategory as KeyOfTicketStatusType
        ]?.find(item => item._id?.toString() === ticketId)

        if (sourceCategory !== targetCategory && item) {
          ticketStatusChange({ sourceCategory, targetCategory, item, ticketId })
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

    console.log({
      projectId: id,
      newStatus: targetCategory,
      ticketId: ticketId,
      oldStatus: sourceCategory,
    })

    updateTicketInformationAndStatus({
      projectId: id,
      newStatus: targetCategory,
      ticketId: ticketId,
      oldStatus: sourceCategory,
    })
  }

  const concatenatedString = statusString => statusString.replace(/\s+/g, '')
  const splitCamelCaseToWords = statusString =>
    statusString?.split(/(?=[A-Z])/).join(' ')

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

  return (
    <div className='AllTickets'>
      <div className='AllTickets-drag-drop'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {Object.keys(getAllTicket)?.map((ticketsStatus: string, i) => (
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
                      concatenatedString={concatenatedString}
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
                              className='data'
                              id={ticketDetail._id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h1>{ticketDetail.status}</h1>
                              <h1>{ticketDetail.description}</h1>
                              <TicketDetail
                                ticketDetail={ticketDetail}
                                getAllTicket={getAllTicket}
                                setGetAllTicket={setGetAllTicket}
                                ticketsStatus={ticketsStatus}
                                splitCamelCaseToWords={splitCamelCaseToWords}
                                concatenatedString={concatenatedString}
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
    </div>
  )
}
