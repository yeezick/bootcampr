import { useState } from 'react'
import { Card, Button, Box } from '@mui/material'
import Modal from 'react-modal'
import MultipleAssignees from '../CreateTickets/MultipleAssignees'

import TextField from '@mui/material/TextField'
import SingleSelect from '../CreateTickets/SingleSelect'

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

const EditTicket = ({ setFakeApi, fakeApiData, sectionName, fake }: any) => {
  const [addTicket, setAddTicket] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false)
  const [assignees, setAssignees] = useState<any>([])
  Modal.setAppElement('#root')

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const editTicket = () => {
    console.log(fakeApiData)

    const info = {
      id: Date.now(),
      issueDetails: addTicket,
      type: 'new',
      assignees: [...assignees],
    }
    setFakeApi({ ...fakeApiData, new: [...fakeApiData.new, info] })
  }
  const handleEditChange = (e: any) => {
    console.log(fake)

    console.log(e.target.value)
  }
  return (
    <div>
      <button onClick={openModal}>Edit a ticket</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <h1>Edit a ticket</h1>

          <Box sx={{ display: 'flex', gap: '30px' }}>
            <Box sx={{ width: '50%' }}>
              <TextField
                sx={{ width: '100%', 'padding-bottom': '20px' }}
                type='text'
                label='Title'
                id='outlined-basic'
                variant='outlined'
                value={fake.issueDetails}
                onChange={handleEditChange}
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
              onClick={() => editTicket()}
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
export default EditTicket
