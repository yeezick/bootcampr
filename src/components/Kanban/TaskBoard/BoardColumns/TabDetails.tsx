import { useAppDispatch } from 'utils/redux/hooks'
import {
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'

export const TabDetails = ({ ticketDetail }) => {
  const { title } = ticketDetail
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    dispatch(setVisibleTicketDialog('edit'))
    dispatch(setTicketFields({ ...ticketDetail }))
  }

  return (
    <div onClick={handleOpenModal} className='ticketDetailOpenModal'>
      <div>
        <h3>{title}</h3>
      </div>
    </div>
  )
}
