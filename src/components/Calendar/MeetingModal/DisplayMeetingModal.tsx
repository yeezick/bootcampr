import { Dialog, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { convertDateFieldsForDisplay } from 'utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectDisplayedEvent,
  selectHangoutLink,
  selectModalDisplayStatus,
  setModalDisplayStatus,
} from 'utils/redux/slices/calendarSlice'
import { DisplayAttendees } from './DisplayAttendees'
import EditNoteIcon from '@mui/icons-material/EditNote'
import LinkIcon from '@mui/icons-material/Link'
import PeopleIcon from '@mui/icons-material/People'
import CloseIcon from '@mui/icons-material/Close'
import './DisplayMeetingModalStyles.scss'

export const DisplayMeetingModal = () => {
  const [displayMeeting, setDisplayMeeting] = useState(false)
  const [displayedFields, setDisplayedFields] = useState({
    date: '',
    end: '',
    start: '',
  })
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const modalDisplayStatus = useAppSelector(selectModalDisplayStatus)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModalDisplayStatus(false))
  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }

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

  const { creator, description, summary } = displayedEvent
  const { date, end, start } = displayedFields
  const eventHasAttendees = displayedEvent.attendees ? true : false

  return (
    <Dialog open={displayMeeting} onClose={handleClose}>
      <DialogContent>
        <div className='modal-icons'>
          <EditNoteIcon onClick={handleEdit} />
          <CloseIcon onClick={handleClose} />
        </div>

        <div className='display-modal-wrapper'>
          <div className='header-img'>img</div>
          <div className='header-content'>
            <h3>{summary}</h3>
            <p>
              {date} {start} - {end}
            </p>
          </div>

          {eventHasAttendees && (
            <PeopleIcon
              className='people-icon centered-icon'
              sx={{ color: iconColor }}
            />
          )}
          {eventHasAttendees && (
            <DisplayAttendees attendees={displayedEvent.attendees} />
          )}

          <EditNoteIcon
            className='description-icon centered-icon'
            sx={{ color: iconColor }}
          />
          <p className='description'>{description}</p>

          <LinkIcon
            className='link-icon centered-icon'
            sx={{ color: iconColor }}
          />
          <p className='meeting-link'>{displayedEvent.location}</p>
          <GoogleMeetIcon />
        </div>

        <div>
          <p> Created by: {creator.email}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const GoogleMeetIcon = () => {
  const hangoutLink = useAppSelector(selectHangoutLink)
  if (hangoutLink) {
    return (
      <a href={hangoutLink} target='_blank' rel='noreferrer'>
        Meeting Link
      </a>
    )
  }
}

const iconColor = '#86888A'
