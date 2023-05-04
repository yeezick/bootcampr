// import { useRef } from "react";
import { Box, Button, Slider, Typography } from '@mui/material'
import CropIcon from '@mui/icons-material/Crop'
import { ImageEditorControlsProps } from 'utilities/types/ProfileImageInterfaces'
import FileInput from 'screens/AccountSettings/components/FileInput/FileInput'
import './ImageEditorModal.scss'

/**
 * ImageEditorControls component displays the controls for the image editor modal.
 * @param {Object} props - Properties passed to the component.
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
    <Box sx={{ width: '100%', mb: 1 }}>
      <Box>
        <Button
          variant='text'
          className='crop-btn'
          startIcon={<CropIcon />}
          size='small'
        >
          Crop
        </Button>
        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
        <Slider
          className='slider'
          valueLabelDisplay='auto'
          valueLabelFormat={zoomPercent}
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={zoomChange}
        />
      </Box>
      <Box
        className='crop-container'
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
        }}
      ></Box>
      <FileInput onFileChange={handleUpload} fileInputRef={fileInputRef} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant='outlined'
          className='change-btn'
          onClick={handleOpenFileInput}
        >
          Change photo
        </Button>
        <Button variant='contained' className='save-btn' onClick={handleSave}>
          Save photo
        </Button>
      </Box>
    </Box>
  )
}

export default ImageEditorControls
