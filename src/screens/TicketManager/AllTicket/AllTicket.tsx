import React, { useState } from 'react'
import { FakeData } from '../Fakedata'
import './ticketManger.css'
import { CreateTicket } from '../CreateTickets/CreateTicket'
import TicketDetail from '../TicketDetail/TicketDetail'
import {
  TaskInterface,
  ticketInterface,
  TicketStatusChangeParams,
} from '../../../utilities/types/TicketInterFace'

export const AllTicket = () => {
  const [getAllTicket, setGetAllTicket] = useState<ticketInterface>(FakeData)
  const [activeItem, setActiveItem] = useState<keyof ticketInterface | null>(
    null
  )

  const dragDropped = (e: any, targetCategory: any) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('id')
    const sourceCategory: keyof ticketInterface | null = activeItem

    const item: TaskInterface | undefined = sourceCategory
      ? getAllTicket[sourceCategory]?.find(
          (item: any) => item.id.toString() === id
        )
      : undefined
    if (sourceCategory !== targetCategory && item) {
      ticketStatusChange({ sourceCategory, targetCategory, item, id })
    }
    setActiveItem(null)
  }

  const ticketStatusChange = ({
    sourceCategory,
    targetCategory,
    item,
    id,
  }: TicketStatusChangeParams) => {
    const removeFromSection: TaskInterface[] | undefined = sourceCategory
      ? getAllTicket[sourceCategory].filter(
          (newStatus: any) => newStatus.id !== Number(id)
        )
      : undefined

    const addToNewSection = [
      ...getAllTicket[targetCategory],
      { ...item, status: targetCategory },
    ]
    setGetAllTicket({
      ...getAllTicket,
      ...(sourceCategory !== null
        ? { [sourceCategory]: removeFromSection }
        : {}),
      [targetCategory]: [...addToNewSection],
    })
  }

  const draggingOver = (e: any) => {
    e.preventDefault()
  }

  const dragHasStarted = (e: any, itemType: any, dataId: any) => {
    e.dataTransfer.setData('id', dataId)
    setActiveItem(itemType)
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className='App'>
      <>
        <CreateTicket
          setGetAllTicket={setGetAllTicket}
          getAllTicket={getAllTicket}
        />
      </>
      {Object.keys(getAllTicket).map((ticketsStatus, i) => (
        <div
          className='container'
          onDrop={e => dragDropped(e, ticketsStatus)}
          // droppable='true'
          key={i}
          onDragOver={e => draggingOver(e)}
        >
          <div>
            <h1>{ticketsStatus}</h1>
          </div>
          <div className='content'>
            {getAllTicket[ticketsStatus].map((ticketDetail: any) => (
              <div
                className='data'
                draggable='true'
                onDragStart={e =>
                  dragHasStarted(e, ticketsStatus, ticketDetail.id)
                }
                onDragEnter={e => handleDragEnter(e)}
                id={ticketDetail.id}
                key={ticketDetail.id}
              >
                <h1>{ticketDetail.id}</h1>
                <h1>{ticketDetail.title}</h1>
                <TicketDetail
                  ticketDetail={ticketDetail}
                  getAllTicket={getAllTicket}
                  setGetAllTicket={setGetAllTicket}
                  ticketsStatus={ticketsStatus}
                />

                {/* <EditTicket
                  setFakeApi={setFakeApi}
                  fakeApiData={fakeApiData}
                  sectionName={sectionName}
                  fake={fake}
                /> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
