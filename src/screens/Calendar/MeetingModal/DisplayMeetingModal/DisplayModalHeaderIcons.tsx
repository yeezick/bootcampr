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
import {
  deleteEvent,
  deleteRecurringEvents,
  fetchRecurringEvents,
} from 'utils/api/events'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'
import { successSnackbar } from 'utils/helpers/commentHelpers'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import { isSandboxId } from 'utils/helpers/taskHelpers'

export const DisplayModalHeaderIcons = ({
  handleClose,
  setDisplayMeeting,
  recurrenceInd,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const authUserEmail = useAppSelector(selectUserEmail)
  const {
    eventId,
    recurringEventId,
    dateFields: { start },
  } = displayedEvent
  const calendarId = useAppSelector(selectCalendarId)
  const open = Boolean(anchorEl)
  const popoverId = open ? 'meeting-popover' : undefined
  const [isLoading, setIsloading] = useState<boolean>(false)
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClosePopover = () => setAnchorEl(null)
  const dispatch = useAppDispatch()

  console.log(start)

  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }

  const handleDelete = async recurDelInd => {
    setIsloading(true)

    try {
      if (recurDelInd === 'series' && recurringEventId) {
        await deleteEvent(calendarId, recurringEventId)
        dispatch(deleteExistingEvent({ eventId: recurringEventId }))
      } else if (recurDelInd === 'instance' && recurringEventId) {
        const instanceToDelete = await fetchRecurringEvents(
          calendarId,
          recurringEventId,
          start
        )

        if (instanceToDelete) {
          await deleteEvent(calendarId, instanceToDelete.id)
          dispatch(deleteExistingEvent({ eventId: instanceToDelete.id }))
        } else {
          console.error('No instance found to delete.')
        }
      } else {
        await deleteEvent(calendarId, eventId)
        dispatch(deleteExistingEvent({ eventId }))
      }
      dispatch(successSnackbar('Meeting canceled successfully.'))
      handleClose()
      setIsloading(false)
    } catch (error) {
      console.log(error)
      setIsloading(false)
    }
  }

  const isEventOrganizer = displayedEvent.organizer === authUserEmail
  const shouldDisplayEventOptions =
    isSandboxId(eventId) || isEventOrganizer ? true : false

  return (
    <div className='modal-icons'>
      {/*shouldDisplayEventOptions &&*/ <MoreVertIcon onClick={handleClick} />}
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
