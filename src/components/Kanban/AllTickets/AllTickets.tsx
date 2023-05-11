import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreateTicket } from 'components/Kanban/CreateTickets/CreateTicket'
import { TicketDetail } from 'components/Kanban/TicketDetail/TicketDetail'

import {
  TicketInterface,
  KeyOfTicketStatusType,
  TaskInterface,
  TicketStatusChangeFunc,
} from 'interfaces/TicketInterFace'
import { ticketDraggedToNewSectionApi } from 'utils/api/tickets'
import '../Ticket.scss'

export const AllTickets = ({ projectTracker }) => {
  const { id } = useParams()

  const [getAllTicket, setGetAllTicket] = useState(
    projectTracker?.projectTracker
  )

  const [activeItem, setActiveItem] = useState<KeyOfTicketStatusType | null>(
    null
  )

  const dragDropped = (
    e: React.DragEvent,
    targetCategory: KeyOfTicketStatusType
  ) => {
    e.preventDefault()
    const ticketId = e.dataTransfer.getData('id')
    const sourceCategory: KeyOfTicketStatusType = concatenatedString(activeItem)

    const item: TicketInterface | undefined = getAllTicket[
      sourceCategory as KeyOfTicketStatusType
    ]?.find(item => item._id?.toString() === ticketId)

    if (sourceCategory !== targetCategory && item) {
      ticketStatusChange({ sourceCategory, targetCategory, item, ticketId })
    }
    setActiveItem(null)
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

    ticketDraggedToNewSectionApi({
      projectId: id,
      newStatus: targetCategory,
      ticketId: ticketId,
      oldStatus: sourceCategory,
    })
  }

  const draggingOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const dragHasStarted = (
    e: React.DragEvent<HTMLDivElement>,
    itemType: KeyOfTicketStatusType | null,
    dataId: string
  ) => {
    e.dataTransfer.setData('id', dataId)
    setActiveItem(itemType)
  }
  const concatenatedString = statusString => statusString.replace(/\s+/g, '')

  const splitCamelCaseToWords = statusString =>
    statusString?.split(/(?=[A-Z])/).join(' ')

  return (
    <div className='AllTickets'>
      {Object.keys(getAllTicket)?.map((ticketsStatus: string, i) => (
        <div
          className='container'
          onDrop={e =>
            dragDropped(e, concatenatedString(ticketsStatus as string))
          }
          key={i}
          onDragOver={draggingOver}
        >
          <div>
            <h1>{splitCamelCaseToWords(ticketsStatus)}</h1>
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
          <div className='content'>
            {getAllTicket[ticketsStatus as KeyOfTicketStatusType]?.map(
              (ticketDetail: TicketInterface) => (
                <div
                  className='data'
                  draggable='true'
                  onDragStart={e =>
                    dragHasStarted(
                      e,
                      splitCamelCaseToWords(
                        ticketsStatus
                      ) as KeyOfTicketStatusType,
                      ticketDetail._id as string
                    )
                  }
                  onDragEnter={handleDragEnter}
                  id={ticketDetail._id}
                  key={ticketDetail._id}
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
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
