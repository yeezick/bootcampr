import { Box, Button, Slider, Typography } from '@mui/material'
import CropIcon from '@mui/icons-material/Crop'
import { ImageEditorControlsProps } from '../../interfaces/ProfileImageInterfaces'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
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
const ImageEditorControls: React.FC<ImageEditorControlsProps> = ({
  fileInputRef,
  zoom,
  setZoom,
  handleUpload,
  handleSave,
}) => {
  const handleOpenFileInput = () => {
    fileInputRef.current?.click()
    console.log('Change Photo button clicked')
  }

  // Updates the zoom state when the zoom slider is adjusted
  const zoomChange = (e: Event, newValue: number | number[]): void => {
    if (typeof newValue === 'number') {
      setZoom(newValue)
    }
  }

  // zoomPercent function - formats the zoom value as a percentage for display
  const zoomPercent = value => {
    return `${Math.round(value * 100)}%`
  }

  return (
    <Box className='image-modal__action-box'>
      <Box className='image-modal__crop-box'>
        <Button
          variant='text'
          className='image-modal__crop-btn'
          startIcon={<CropIcon />}
          size='small'
        >
          Crop
        </Button>
        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
        <Slider
          className='image-modal__slider'
          valueLabelDisplay='auto'
          valueLabelFormat={zoomPercent}
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={zoomChange}
        />
      </Box>
      <Box className='image-modal__crop-container'></Box>
      <FileInput onFileChange={handleUpload} fileInputRef={fileInputRef} />
      <Box className='image-modal__button-box'>
        <Button
          variant='outlined'
          className='image-modal__change-btn'
          onClick={handleOpenFileInput}
        >
          Change photo
        </Button>
        <Button
          variant='contained'
          className='image-modal__save-btn'
          onClick={handleSave}
        >
          Save photo
        </Button>
      </Box>
    </Box>
  )
}

export default ImageEditorControls
