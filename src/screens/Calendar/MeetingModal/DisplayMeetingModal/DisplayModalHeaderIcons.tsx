import * as React from 'react'
import { useAppDispatch } from 'utils/redux/hooks'
import { setModalDisplayStatus } from 'utils/redux/slices/calendarSlice'
import { Close } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DisplayPopover } from './DisplayPopover'
import { deleteEvent } from 'utils/api/events'

export const DisplayModalHeaderIcons = ({
  handleClose,
  setDisplayMeeting,
  eventId,
  calendarId,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

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
