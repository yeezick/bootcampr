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
import { Checkbox } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectProject } from 'utils/redux/slices/projectSlice'

// TODO: Rename projectTracker to project
export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProject)
  const [allTaskChecked, setAllTaskChecked] = useState(true)
  const [myTaskChecked, setMyTaskChecked] = useState(false)
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

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

  const filterOutTickets = objectKey => {
    return getAllTicket[objectKey].filter(
      assign => assign.assignee === authUser._id
    )
  }

  return (
    <div className='AllTickets'>
      <BoardHeader />
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

export const BoardHeader = () => {
  const [viewAllTasks, setViewAllTasks] = useState(false)
  const [viewMyTasks, setViewMyTasks] = useState(false)

  // const getAllTickets = () => {
  //   setViewAllTasks(true);
  //   setMyTaskChecked(false);
  //   setGetAllTicket(projectTracker.projectTracker);
  // };

  // const onlyGetMyTicket = () => {
  //   setAllTaskChecked(false);
  //   setMyTaskChecked(true);

  //   if (getAllTicket) {
  //     const newProjectDetail = {
  //       projectTracker: {
  //         toDo: filterOutTickets("toDo"),
  //         inProgress: filterOutTickets("inProgress"),
  //         underReview: filterOutTickets("underReview"),
  //         completed: filterOutTickets("completed"),
  //       },
  //     };
  //     setGetAllTicket({
  //       ...newProjectDetail.projectTracker,
  //     });
  //   }
  // };

  return (
    <div>
      <div className='Project-header'>
        <h1>Kanban board</h1>
      </div>
      <div className='Project-filter'>
        <span>
          {/* <Checkbox checked={viewAllTasks} onClick={getAllTickets} /> */}
          <p>All tasks</p>
        </span>
        <span>
          {/* <Checkbox checked={viewMyTasks} onClick={onlyGetMyTicket} /> */}
          <p>My tasks</p>
        </span>
      </div>
    </div>
  )
}
