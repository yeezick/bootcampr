import { Box } from '@mui/material'
import './ImageEditorModal.scss'

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
    <Box className='image-modal__action-box'>
      <Box className='image-modal__button-box'>
        <button className='image-modal__cancel-btn' onClick={handleClose}>
          Cancel
        </button>
        <button className='image-modal__save-btn' onClick={handleSave}>
          Save photo
        </button>
      </Box>
    </Box>
  )
}

export default ImageEditorControls
