import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
const TicketDetail = ({ fake, fakeApiData, setFakeApi, sectionName }: any) => {
  Modal.setAppElement('#root')
  const [addTicket, setAddTicket] = useState('')
  let subtitle: any
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }
  function deleteTicket(id: any) {
    const test = fakeApiData[sectionName].filter(
      (ticket: any) => ticket.id !== id
    )
    setFakeApi({ ...fakeApiData, [sectionName]: [...test] })
    closeModal()
  }
  return (
    <div>
      <button onClick={openModal}> Ticket Detail</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <button onClick={closeModal}>close</button>
        <h1>Ticket Detail</h1>
        <div>{fake?.id}</div>
        <div>{fake?.title}</div>
        <button onClick={() => deleteTicket(fake?.id)}>Delete</button>
      </Modal>
    </div>
  )
}

export default TicketDetail
