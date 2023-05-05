import { Box, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ImageEditorHeaderProps } from 'utilities/types/ProfileImageInterfaces'
import './ImageEditorModal.scss'

/**
 * ImageEditorHeader component displays the header of the image editor modal.
 * @param {Object} props - Properties passed to the component.
 * @param {Function} handleClose - Function to call when the close button is clicked.
 * @returns {JSX.Element} - ImageEditorHeader component.
 */
const ImageEditorHeader: React.FC<ImageEditorHeaderProps> = ({
  handleClose,
}) => {
  return (
    <Box className='image-modal__header'>
      <div></div>
      <DialogTitle className='image-modal__title'>Edit photo</DialogTitle>
      <CloseIcon className='image-modal__close-btn' onClick={handleClose} />
    </Box>
  )
}

export default ImageEditorHeader
