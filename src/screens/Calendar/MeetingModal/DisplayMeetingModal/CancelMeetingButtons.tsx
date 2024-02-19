import Button from '@mui/material/Button'

export const CancelMeetingButtons = ({ handleCloseModal, handleDelete }) => {
  return (
    <div className='discard-buttons-container'>
      <Button sx={cancelButtonStyles} onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button sx={discardButtonStyles} onClick={handleDelete}>
        Cancel Meeting
      </Button>
    </div>
  )
}

const discardButtonStyles = {
  backgroundColor: '#D32F2F',
  color: 'white',
  textTransform: 'none',
  padding: '8px 20px',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: '#D32F2F',
  },
}

const cancelButtonStyles = {
  color: '#1A237E',
  backgroundColor: 'white',
  textTransform: 'none',
  padding: '8px 20px',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: 'white',
  },
}
