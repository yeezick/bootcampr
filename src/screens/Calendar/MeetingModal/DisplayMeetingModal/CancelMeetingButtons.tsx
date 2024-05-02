import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const CancelMeetingButtons = ({
  handleCloseModal,
  handleDelete,
  isLoading,
}) => {
  return (
    <ButtonContainer style={{ marginTop: '30px' }}>
      <TextButton
        label='Cancel'
        onClick={handleCloseModal}
        colorScheme='primary'
      />
      <PrimaryButton
        loading={isLoading}
        colorScheme='secondary'
        onClick={handleDelete}
        label='Cancel Meeting'
      />
    </ButtonContainer>
  )
}
