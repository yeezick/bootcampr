import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { CancelMeetingButtons } from './CancelMeetingButtons'

export const CancelMeetingModal = ({
  openModal,
  handleCloseModal,
  handleDelete,
}) => {
  return (
    <div>
      <Modal
        open={openModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h2>Cancel the meeting?</h2>
          <p>
            All invitees will receive an email notification the meeting is
            canceled.
          </p>
          <CancelMeetingButtons
            handleCloseModal={handleCloseModal}
            handleDelete={handleDelete}
          />
        </Box>
      </Modal>
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxWidth: '300px',
  padding: '25px',
  paddingTop: '20px',
  borderRadius: '5px',
}
