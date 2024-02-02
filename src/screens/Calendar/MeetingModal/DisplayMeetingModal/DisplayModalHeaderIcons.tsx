import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  setModalDisplayStatus,
  selectDisplayedEvent,
  deleteExistingEvent,
} from 'utils/redux/slices/calendarSlice'
import { Close } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DisplayPopover } from './DisplayPopover'
import { deleteEvent } from 'utils/api/events'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'

export const DisplayModalHeaderIcons = ({ handleClose, setDisplayMeeting }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const { eventId } = displayedEvent
  const calendarId = useAppSelector(selectCalendarId)

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
      dispatch(deleteExistingEvent({ eventId }))
      handleClose()
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
