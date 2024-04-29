import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const CancelMeetingButtons = ({ handleCloseModal, handleDelete }) => {
  return (
    <ButtonContainer style={{ marginTop: '30px' }}>
      <TextButton
        label='Cancel'
        onClick={handleCloseModal}
        colorScheme='primary'
      />
      <PrimaryButton
        colorScheme='secondary'
        onClick={handleDelete}
        style={{ padding: '8px 20px' }}
        label='Cancel Meeting'
      />
    </ButtonContainer>
  )
}
