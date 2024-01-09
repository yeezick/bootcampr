import Button from '@mui/material/Button'

export const DiscardChangesButtons = ({
  handleClose,
  handleCloseDiscardChanges,
}) => {
  return (
    <div>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleCloseDiscardChanges}>Discard</Button>
    </div>
  )
}
