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
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { RiGoogleLine } from 'react-icons/ri'
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
        />
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

export const DisplayTimeAndSummary = ({ displayedFields, summary }) => {
  const { date, end, start } = displayedFields

  return (
    <div className='header-content'>
      <h3>{summary}</h3>
      <p>
        {date} {start} - {end}
      </p>
    </div>
  )
}
export const DisplayModalHeaderIcons = ({ handleClose, setDisplayMeeting }) => {
  const dispatch = useAppDispatch()
  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }
  return (
    <div className='modal-icons'>
      <EditNoteIcon onClick={handleEdit} />
      <CloseIcon onClick={handleClose} />
    </div>
  )
}

export const DisplayDescription = () => {
  const { description } = useAppSelector(selectDisplayedEvent)
  return (
    description && (
      <>
        <DescriptionOutlinedIcon className='description-icon centered-icon' />
        <p className='description'>{description}</p>
      </>
    )
  )
}

const DisplayMeetingLink = () => {
  const hangoutLink = useAppSelector(selectHangoutLink)
  return (
    hangoutLink && (
      <>
        <RiGoogleLine className='google-meet-icon' size={23} />
        <a
          className='meeting-link'
          href={hangoutLink}
          target='_blank'
          rel='noreferrer'
        >
          Google Meet Link
        </a>
      </>
    )
  )
}
