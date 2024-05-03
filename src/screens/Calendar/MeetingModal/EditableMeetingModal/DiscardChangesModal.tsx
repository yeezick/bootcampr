import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { DiscardChangesButtons } from './DiscardChangesButtons'
import '../styles/DiscardChangesModal.scss'

export const DiscardChangesModal = ({
  handleCloseDiscardChanges,
  handleClose,
  open,
}) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h2>Discard unsaved changes?</h2>
          <p>
            Any information you input or changes you made will not be saved.
          </p>
          <DiscardChangesButtons
            handleClose={handleClose}
            handleCloseDiscardChanges={handleCloseDiscardChanges}
          />
        </Box>
      </Modal>
    </>
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
}
