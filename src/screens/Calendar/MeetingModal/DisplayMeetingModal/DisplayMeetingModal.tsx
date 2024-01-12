import { Dialog, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { convertDateFieldsForDisplay } from 'utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectCalendarId } from 'utils/redux/slices/projectSlice'
import {
  selectDisplayedEvent,
  selectModalDisplayStatus,
  setModalDisplayStatus,
} from 'utils/redux/slices/calendarSlice'
import { DisplayAttendees } from './DisplayAttendees'
import '../styles/DisplayMeetingModal.scss'
import { DisplayTimeAndSummary } from './DisplayTimeAndSummary'
import { DisplayModalHeaderIcons } from './DisplayModalHeaderIcons'
import { DisplayDescription } from './DisplayDescription'
import { DisplayMeetingLink } from './DisplayMeetingLink'

export const DisplayMeetingModal = () => {
  const [displayMeeting, setDisplayMeeting] = useState(false)
  const [displayedFields, setDisplayedFields] = useState({
    date: '',
    end: '',
    start: '',
  })
  //const { eventId } = useAppSelector(selectDisplayedEvent)
  const calendarId = useAppSelector(selectCalendarId)
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModalDisplayStatus(false))

  useEffect(() => {
    if (modalDisplayStatus === 'display') {
      setDisplayedFields(
        convertDateFieldsForDisplay(displayedEvent.googleDateFields)
      )
      setDisplayMeeting(true)
    } else {
      setDisplayMeeting(false)
    }
  }, [modalDisplayStatus])

  if (!displayedEvent) {
    return null
  }
  const { creator, summary } = displayedEvent

  return (
    <Dialog open={displayMeeting} onClose={handleClose}>
      <DialogContent>
        <DisplayModalHeaderIcons
          handleClose={handleClose}
          setDisplayMeeting={setDisplayMeeting}
          calendarId={calendarId}
        />
        {/*eventId={eventId}*/}
        <div className='display-modal-wrapper'>
          <DisplayTimeAndSummary
            displayedFields={displayedFields}
            summary={summary}
          />
          <DisplayAttendees />
          <DisplayMeetingLink />
          <DisplayDescription />
          <p className='created-by'> Created by: {creator.email}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
