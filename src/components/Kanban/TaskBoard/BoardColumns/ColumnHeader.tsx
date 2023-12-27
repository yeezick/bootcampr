import { formatTaskStatus } from 'utils/helpers/taskHelpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectVisibleTickets } from 'utils/redux/slices/taskBoardSlice'

export const ColumnHeader = ({ columnStatus }) => {
  const visibleTickets = useAppSelector(selectVisibleTickets)
  return (
    <div className='column-header'>
      <p>{formatTaskStatus(columnStatus)}</p>
      <span>{visibleTickets[columnStatus].length}</span>
    </div>
  )
}
