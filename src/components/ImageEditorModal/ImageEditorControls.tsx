import './ImageEditorModal.scss'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { PrimaryButton, TextButton } from 'components/Buttons'

/**
 * ImageEditorControls component displays the controls for the image editor modal.
 * @param {Object} fileInputRef - Ref to the file input element.
 * @param {number} zoom - Current zoom level.
 * @param {Function} setZoom - Function to update the zoom level.
 * @param {Function} handleUpload - Function to handle file upload.
 * @param {Function} handleSave - Function to handle saving the edited image.
 * @returns {JSX.Element} - ImageEditorControls component.
 */
const ImageEditorControls = ({ handleSave, handleClose }) => {
  return (
    <ButtonContainer justify='center' gap={16}>
      <TextButton label='Cancel' onClick={handleClose} />
      <PrimaryButton label='Save photo' onClick={handleSave} />
    </ButtonContainer>
  )
}

export default ImageEditorControls
