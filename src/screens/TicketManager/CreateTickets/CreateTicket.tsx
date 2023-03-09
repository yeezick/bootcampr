import { Card, Button } from '@mui/material'

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import MultipleAssignees from './MultipleAssignees'
const customStyles = {
  content: {
    top: '50%',
    width: '40rem',
    height: '25rem',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '50%',
    transform: 'translate(-50%, -50%)',
  },
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const CreateTicket = ({ setFakeApi, fakeApiData }: any) => {
  Modal.setAppElement('#root')
  const [addTicketForm, setAddTicketForm] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false)
  const [assignees, setAssignees] = useState<any>([])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const onChange = (e: any) => {}

  const addTickets = () => {
    const info = {
      id: Date.now(),
      issueDetails: addTicketForm,
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
        <div>
          <h1>Create a ticket</h1>
          <MultipleAssignees
            setAssignees={setAssignees}
            assignees={assignees}
          />
          <div>
            <input type='text' placeholder='title' />
            <input type='text' placeholder='description' />
            <input
              type='text'
              onChange={e => setAddTicketForm(e.target.value)}
            />
            <Button
              color='primary'
              disabled={false}
              size='small'
              variant='outlined'
              // size="12px"
              onClick={() => addTickets()}
            >
              Add a ticket
            </Button>
            <Button
              color='error'
              disabled={false}
              size='small'
              variant='outlined'
              onClick={closeModal}
            >
              close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
