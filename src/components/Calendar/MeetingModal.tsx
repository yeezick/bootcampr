import { Box, Modal } from '@mui/material'

// Todo: Disable auto-close onBlur of modal
export const MeetingModal = ({ toggleMeetingModal, visibleMeeting }) => {
  return (
    <Modal open={visibleMeeting} onClose={toggleMeetingModal}>
      <Box sx={modalStyles}>
        <p>Create a new meeting</p>
      </Box>
    </Modal>
  )
}

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
