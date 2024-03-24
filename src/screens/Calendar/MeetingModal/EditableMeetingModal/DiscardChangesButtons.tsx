import {
  PrimaryButton,
  SecondaryButton,
} from 'components/Buttons/ButtonVariants'

export const DiscardChangesButtons = ({
  handleClose,
  handleCloseDiscardChanges,
}) => {
  return (
    <div className='discard-buttons-container'>
      <SecondaryButton
        text='Cancel'
        handler={handleClose}
        style={cancelButtonStyles}
      />
      <PrimaryButton handler={handleCloseDiscardChanges} text='Discard' />
    </div>
  )
}

const cancelButtonStyles = {
  border: 'none',
  '&:hover': {
    border: 'none',
  },
}
