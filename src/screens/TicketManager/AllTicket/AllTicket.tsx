import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreateTicket } from '../CreateTickets/CreateTicket'
import TicketDetail from '../TicketDetail/TicketDetail'
import { ticketStatusChangedApi } from 'utils/api'
import './ticketManger.css'

import {
  TicketInterface,
  KeyOfTicketStatusType,
  TaskInterface,
  TicketStatusChangeParams,
  TicketStatusChangeFunc,
} from '../../../interfaces/TicketInterFace'

export const AllTicket = ({ projectTracker }) => {
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

    ticketStatusChangedApi({
      projectId: id,
      newStatus: targetCategory,
      ticketID: ticketId,
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

  const splitCamelCaseToWords = (str: string) =>
    str.split(/(?=[A-Z])/).join(' ')

  return (
    <div className='App'>
      <>
        <CreateTicket
          setGetAllTicket={setGetAllTicket}
          getAllTicket={getAllTicket}
        />
      </>
      {Object.keys(getAllTicket)?.map((ticketsStatus: string, i) => (
        <div
          className='container'
          onDrop={e =>
            dragDropped(e, concatenatedString(ticketsStatus as string))
          }
          key={i}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => draggingOver(e)}
        >
          <div>
            <h1>{splitCamelCaseToWords(ticketsStatus)}</h1>
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
                  onDragEnter={e => handleDragEnter(e)}
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

                  {/* <EditTicket
                  setFakeApi={setFakeApi}
                  fakeApiData={fakeApiData}
                  sectionName={sectionName}
                  fake={fake}
                /> */}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
