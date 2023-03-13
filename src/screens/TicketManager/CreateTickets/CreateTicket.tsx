import { Card, Button, Box } from '@mui/material'

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import MultipleAssignees from './MultipleAssignees'
import TextField from '@mui/material/TextField'
import SingleSelect from './SingleSelect'
import { border } from '@mui/system'
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
      title: addTicketForm,
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

          <Box sx={{ display: 'flex', gap: '30px' }}>
            <Box sx={{ width: '50%' }}>
              <TextField
                sx={{ width: '100%', 'padding-bottom': '20px' }}
                type='text'
                label='Title'
                id='outlined-basic'
                variant='outlined'
              />
              <TextField
                sx={{ width: '100%' }}
                id='outlined-basic'
                label='Outlined'
                variant='outlined'
              />
            </Box>

            <Box sx={{ width: '50%' }}>
              <TextField
                sx={{ width: '100%', 'padding-bottom': '20px' }}
                type='text'
                id='outlined-basic'
                label='Description'
                variant='outlined'
                multiline
                InputProps={{ rows: 4.5 }}
              />
              <SingleSelect />
              <MultipleAssignees
                setAssignees={setAssignees}
                assignees={assignees}
              />
            </Box>
          </Box>
          <Box>
            <Button
              sx={{ 'margin-right': '10px' }}
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
              sx={{ 'margin-right': '10px' }}
              color='error'
              disabled={false}
              size='small'
              variant='outlined'
              onClick={closeModal}
            >
              close
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  )
}
