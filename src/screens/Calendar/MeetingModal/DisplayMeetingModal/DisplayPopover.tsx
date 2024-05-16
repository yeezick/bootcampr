import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { CancelMeetingModal } from './CancelMeetingModal'
import { useState } from 'react'

export const DisplayPopover = ({
  anchorEl,
  handleClosePopover,
  handleEdit,
  handleDelete,
  isLoading,
  popoverId,
  open,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  return (
    <>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={popoverStyles}
      >
        <Typography sx={{ p: 2 }} onClick={handleEdit}>
          Edit
        </Typography>
        <Typography sx={{ p: 2 }} onClick={handleOpenModal}>
          Cancel Meeting
        </Typography>
      </Popover>
      <CancelMeetingModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  )
}

const popoverStyles = {
  '& .MuiTypography-root': {
    '&:hover': {
      backgroundColor: '#00000014',
      cursor: 'pointer',
    },
  },
}
