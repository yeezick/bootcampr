import { PrimaryButton, TextButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const DiscardChangesButtons = ({
  handleClose,
  handleCloseDiscardChanges,
}) => {
  return (
    <ButtonContainer>
      <TextButton label='Cancel' onClick={handleClose} colorScheme='primary' />
      <PrimaryButton label='Discard' onClick={handleCloseDiscardChanges} />
    </ButtonContainer>
  )
}
