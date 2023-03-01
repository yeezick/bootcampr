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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const CreateTicket = ({ setFakeApi, fakeApiData }: any) => {
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

  const addTickets = () => {
    const info = {
      id: Date.now(),
      issueDetails: addTicket,
      type: 'new',
    }
    setFakeApi({ ...fakeApiData, new: [...fakeApiData.new, info] })
  }
  return (
    <div>
      <button onClick={openModal}>Create a ticket</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <button onClick={closeModal}>close</button>
        <h1>Create a ticket</h1>
        <div>
          <input type='text' onChange={e => setAddTicket(e.target.value)} />
          <button onClick={() => addTickets()}> add a ticket </button>
        </div>
      </Modal>
    </div>
  )
}
