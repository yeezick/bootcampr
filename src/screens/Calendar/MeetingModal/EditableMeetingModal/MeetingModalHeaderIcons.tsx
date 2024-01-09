import { useAppDispatch } from 'utils/redux/hooks'
import { setModalDisplayStatus } from 'utils/redux/slices/calendarSlice'
import { ArrowBack, Clear } from '@mui/icons-material'

export const MeetingModalHeaderIcons = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const handleBackToDisplay = () => dispatch(setModalDisplayStatus('display'))

  return (
    <div className='meeting-modal-icons'>
      <ArrowBack className='back-arrow-icon' onClick={handleBackToDisplay} />
      <Clear className='clear-icon' onClick={handleClose} />
    </div>
  )
}
