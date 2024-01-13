import Button from '@mui/material/Button'

export const DiscardChangesButtons = ({
  handleClose,
  handleCloseDiscardChanges,
}) => {
  return (
    <div className='discard-buttons-container'>
      <Button onClick={handleClose} sx={cancelButtonStyles}>
        Cancel
      </Button>
      <Button onClick={handleCloseDiscardChanges} sx={discardButtonStyles}>
        Discard
      </Button>
    </div>
  )
}

const discardButtonStyles = {
  backgroundColor: '#fa9413',
  color: '#1A237E',
  textTransform: 'none',
  padding: '8px 20px',

  '&:hover': {
    backgroundColor: '#fa9413',
  },
}

const cancelButtonStyles = {
  color: '#1A237E',
  backgroundColor: 'white',
  textTransform: 'none',
  padding: '8px 20px',

  '&:hover': {
    backgroundColor: 'white',
  },
}
