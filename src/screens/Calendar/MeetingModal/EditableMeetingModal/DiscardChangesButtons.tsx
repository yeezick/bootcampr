import { PrimaryButton, TextButton } from 'components/Buttons/ButtonVariants'

export const DiscardChangesButtons = ({
  handleClose,
  handleCloseDiscardChanges,
}) => {
  return (
    <div className='discard-buttons-container'>
      <TextButton text='Cancel' handler={handleClose} colorScheme='primary' />
      <PrimaryButton handler={handleCloseDiscardChanges} text='Discard' />
    </div>
  )
}
