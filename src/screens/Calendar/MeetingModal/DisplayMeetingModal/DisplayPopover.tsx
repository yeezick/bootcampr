import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useAppSelector } from 'utils/redux/hooks'
import { selectDisplayedEvent } from 'utils/redux/slices/calendarSlice'

export const DisplayPopover = ({
  handleClosePopover,
  handleEdit,
  id,
  open,
  anchorEl,
  handleDelete,
}) => {
  const { eventId } = useAppSelector(selectDisplayedEvent)

  return (
    <>
      <Popover
        id={id}
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
        <Typography sx={{ p: 2 }} onClick={handleDelete}>
          Cancel Meeting
        </Typography>
      </Popover>
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
