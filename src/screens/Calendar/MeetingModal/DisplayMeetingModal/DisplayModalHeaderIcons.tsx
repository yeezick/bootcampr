import { useAppDispatch } from 'utils/redux/hooks'
import { setModalDisplayStatus } from 'utils/redux/slices/calendarSlice'
import { Close, EditNote } from '@mui/icons-material'

export const DisplayModalHeaderIcons = ({ handleClose, setDisplayMeeting }) => {
  const dispatch = useAppDispatch()
  const handleEdit = () => {
    dispatch(setModalDisplayStatus('edit'))
    setDisplayMeeting(false)
  }
  return (
    <div className='modal-icons'>
      <EditNote onClick={handleEdit} />
      <Close onClick={handleClose} />
    </div>
  )
}
