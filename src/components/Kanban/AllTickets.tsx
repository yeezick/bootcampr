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
import kanbanImage from './svg/bootcampr.png'
import './Ticket.scss'
import { SnackBarToast } from 'components/SnackBarToast/SnackBarToast'
import { SnackBarToastInterface } from 'interfaces/SnackBarToast'

export const AllTickets = ({ projectTracker }) => {
  const { id } = useParams()
  const [getAllTicket, setGetAllTicket] = useState(
    projectTracker?.projectTracker
  )
  const { members } = projectTracker
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
    updateTicketInformationAndStatus({
      projectId: id,
      newStatus: targetCategory,
      ticketId: ticketId,
      oldStatus: sourceCategory,
    })
  }

  const concatenatedString = (statusString: string) =>
    statusString.replace(/\s+/g, '')
  const splitCamelCaseToWords = (statusString: string) =>
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

  const checkIfTheresNoTicket = () => {
    const noTicket = Object.keys(getAllTicket).every(
      ticketStatus => getAllTicket[ticketStatus]?.length === 0
    )
    return noTicket
  }

  return (
    <div className='AllTickets'>
      <div
        className={`${
          checkIfTheresNoTicket()
            ? 'AllTicketsDragDropNoTicket'
            : 'AllTicketsDragDrop'
        }`}
      >
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
                      buttonText='Create task'
                      projectMembers={members}
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
      {checkIfTheresNoTicket() ? (
        <div className='ifTheresNoTicket'>
          <div className='ifTheresNoTicketImageContainer'>
            <img src={kanbanImage} alt='kanbanImage' />
          </div>
          <div>
            <h1>Your team hasn’t created any tasks.</h1>
          </div>
          <div className='textBox'>
            <p>
              Maximize efficiency and visualize work by tracking tasks here.
              Move the task through the board from To Do to Complete. You’ll be
              one step closer to shipping a live product with each completed
              task!
            </p>
          </div>
          <div>
            <CreateTicket
              projectId={id}
              setGetAllTicket={setGetAllTicket}
              getAllTicket={getAllTicket}
              ticketsStatus={'to Do'}
              concatenatedString={concatenatedString}
              buttonText=' Created first task'
              buttonClassName='button2'
              projectMembers={members}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
