import React, { useState } from 'react'
import { FakeData } from '../Fakedata'
import './ticketManger.css'
import { CreateTicket } from '../CreateTickets/CreateTicket'
import TicketDetail from '../TicketDetail/TicketDetail'
import EditTicket from '../EditTicket/EditTicket'
export const AllTicket = () => {
  const [fakeApiData, setFakeApi] = useState<any>(FakeData)
  const [activeItem, setActiveItem] = useState(null)

  const dragDropped = (e: any, targetCategory: any) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('id')
    const sourceCategory: any = activeItem
    const item: any = fakeApiData[sourceCategory].find(
      (item: any) => item.id.toString() === id
    )
    if (sourceCategory !== targetCategory && item) {
      setFakeApi((prevState: any) => {
        const newState = { ...prevState }
        newState[sourceCategory] = prevState[sourceCategory].filter(
          (item: any) => item.id.toString() !== id
        )
        newState[targetCategory] = [...prevState[targetCategory], item]
        return newState
      })
    }
    setActiveItem(null)
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
        <CreateTicket setFakeApi={setFakeApi} fakeApiData={fakeApiData} />
      </>
      {Object.keys(fakeApiData).map((sectionName, i) => (
        <div
          className='container'
          onDrop={e => dragDropped(e, sectionName)}
          // droppable='true'
          key={i}
          onDragOver={e => draggingOver(e)}
        >
          <div>
            <h1>{sectionName}</h1>
          </div>
          <div className='content'>
            {fakeApiData[sectionName].map((fake: any) => (
              <div
                className='data'
                draggable='true'
                onDragStart={e => dragHasStarted(e, sectionName, fake.id)}
                onDragEnter={e => handleDragEnter(e)}
                id={fake.id}
                key={fake.id}
              >
                <h1>{fake.id}</h1>
                <h1>{fake.issueDetails}</h1>
                <TicketDetail
                  fake={fake}
                  fakeApiData={fakeApiData}
                  setFakeApi={setFakeApi}
                  sectionName={sectionName}
                />

                <EditTicket
                  setFakeApi={setFakeApi}
                  fakeApiData={fakeApiData}
                  sectionName={sectionName}
                  fake={fake}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
