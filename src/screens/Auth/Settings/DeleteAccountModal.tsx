import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import ClearIcon from '@mui/icons-material/Clear'
import './Settings.scss'
import { deleteUserAccount, logOut } from 'utils/api'
import { useNavigate, useParams } from 'react-router-dom'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export const DeleteAccountModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const confirmDeleteUserAccount = async () => {
    const deletedAccount = await deleteUserAccount(id)
    if (deletedAccount?.deletionStatus) {
      logOut()
      navigate('/')
      return
    }
  }

  return (
    <div>
      <button onClick={handleOpen} className='delete-account-button'>
        Delete Account
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='delete-account-x-icons-container'>
            <ClearIcon
              onClick={handleClose}
              className='delete-account-x-icons'
            />
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Delete your account?
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            This will delete your account and all associated information. The
            operation cannot be undone.
          </Typography>
          <div className='deleteAccount-modal-buttons'>
            <button
              type='submit'
              className='editprofile__cancelBtn'
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className='delete-account-button'
              onClick={confirmDeleteUserAccount}
            >
              Delete my account
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
