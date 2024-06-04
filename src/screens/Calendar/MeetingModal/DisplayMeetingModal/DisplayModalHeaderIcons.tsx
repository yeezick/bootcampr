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
import { checkSandboxEvent } from 'utils/helpers'
import { successSnackbar } from 'utils/helpers/commentHelpers'

export const DisplayModalHeaderIcons = ({ handleClose, setDisplayMeeting }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const { eventId } = displayedEvent
  const calendarId = useAppSelector(selectCalendarId)
  const open = Boolean(anchorEl)
  const popoverId = open ? 'meeting-popover' : undefined
  const [isLoading, setIsloading] = useState<boolean>(false)
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClosePopover = () => setAnchorEl(null)
  const dispatch = useAppDispatch()

  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }

  const handleDelete = async e => {
    setIsloading(true)
    try {
      await deleteEvent(calendarId, eventId)
      dispatch(deleteExistingEvent({ eventId }))
      dispatch(successSnackbar('Meeting canceled successfully.'))
      handleClose()
      setIsloading(false)
    } catch (error) {
      console.log(error)
      setIsloading(false)
    }
  }

  return (
    <div className='modal-icons'>
      {!checkSandboxEvent(eventId) && <MoreVertIcon onClick={handleClick} />}
      <DisplayPopover
        isLoading={isLoading}
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        popoverId={popoverId}
        open={open}
      />
      <Close onClick={handleClose} />
    </div>
  )
}
