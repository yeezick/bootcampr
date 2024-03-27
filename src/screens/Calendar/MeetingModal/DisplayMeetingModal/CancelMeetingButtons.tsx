import Button from '@mui/material/Button'
import {
  SecondaryButton,
  TextButton,
  PrimaryButton,
} from 'components/Buttons/ButtonVariants'

export const CancelMeetingButtons = ({ handleCloseModal, handleDelete }) => {
  return (
    <div className='discard-buttons-container'>
      <TextButton
        text='Cancel'
        handler={handleCloseModal}
        colorScheme='primary'
      />
      <PrimaryButton
        text='Cancel Meeting'
        colorScheme='secondary'
        style={discardButtonStyles}
      />
    </div>
  )
}

const discardButtonStyles = {
  padding: '8px 20px',
}
