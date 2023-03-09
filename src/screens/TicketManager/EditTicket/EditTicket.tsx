import { useState } from 'react'
import Modal from 'react-modal'
import MultipleAssignees from '../CreateTickets/MultipleAssignees'
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

const EditTicket = ({ setFakeApi, fakeApiData }: any) => {
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
          <MultipleAssignees
            setAssignees={setAssignees}
            assignees={assignees}
          />
          <div>
            <input type='text' placeholder='title' />
            <input type='text' placeholder='description' />
            <input type='text' onChange={e => setAddTicket(e.target.value)} />
            <button onClick={() => editTicket()}> add a ticket </button>
            <button onClick={closeModal}>close</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default EditTicket
