import { useState } from 'react'
import { useAppDispatch } from 'utils/redux/hooks'
import { setModalDisplayStatus } from 'utils/redux/slices/calendarSlice'
import { Close } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DisplayPopover } from './DisplayPopover'
import { deleteEvent } from 'utils/api/events'
import { CancelMeetingModal } from './CancelMeetingModal'

export const DisplayModalHeaderIcons = ({
  handleClose,
  setDisplayMeeting,
  calendarId,
  eventId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClosePopover = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'meeting-popover' : undefined

  const dispatch = useAppDispatch()

  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }

  const handleDelete = async e => {
    try {
      await deleteEvent(calendarId, eventId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='modal-icons'>
      <MoreVertIcon onClick={handleClick} />
      <DisplayPopover
        handleClosePopover={handleClosePopover}
        handleEdit={handleEdit}
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleDelete={handleDelete}
      />
      <Close onClick={handleClose} />
    </div>
  )
}
