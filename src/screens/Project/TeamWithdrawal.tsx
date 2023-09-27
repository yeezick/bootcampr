import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './Team.scss'

const style = {
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

export const TeamWithdrawal = ({ handleCloseModals }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: 'red' }}>
        Withdraw from project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            className='custom-modal-text'
            sx={{
              color: 'black',
              size: 14,
              weight: 400,
            }}
          >
            Just making sure, do you really want to withdraw from the project?
          </Typography>
          <div className='confirmation-btns'>
            <div>
              <button className='stay-btn' onClick={() => handleCloseModals()}>
                Stay
              </button>
            </div>
            <div>
              <button className='withdraw-final-btn'>Withdraw</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
