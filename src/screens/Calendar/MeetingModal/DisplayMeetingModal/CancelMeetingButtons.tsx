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
        colorScheme='secondary'
        handler={handleDelete}
        style={discardButtonStyles}
        text='Cancel Meeting'
      />
    </div>
  )
}

const discardButtonStyles = {
  padding: '8px 20px',
}
