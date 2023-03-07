import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import MultipleAssignees from './MultipleAssignees'
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
  const [modalIsOpen, setIsOpen] = useState(false)
  const [assignees, setAssignees] = useState<any>({})

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const addTickets = () => {
    const info = {
      id: Date.now(),
      issueDetails: addTicket,
      type: 'new',
      assignees: [...assignees],
    }
    setFakeApi({ ...fakeApiData, new: [...fakeApiData.new, info] })
  }
  return (
    <div>
      <button onClick={openModal}>Create a ticket</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <button onClick={closeModal}>close</button>
        <h1>Create a ticket</h1>
        <MultipleAssignees setAssignees={setAssignees} />
        <div>
          <input type='text' onChange={e => setAddTicket(e.target.value)} />
          <button onClick={() => addTickets()}> add a ticket </button>
        </div>
      </Modal>
    </div>
  )
}
