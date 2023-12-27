import { DragDropContext } from '@hello-pangea/dnd'
import { saveTicketStatusChange } from 'utils/api/tickets'
import { useAppDispatch } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import { updateTicketStatus } from 'utils/redux/slices/projectSlice'
import { StatusColumn } from './StatusColumn'
import '../styles/BoardColumnStyles.scss'

export const BoardColumns = () => {
  const { projectId } = useParams()
  const dispatch = useAppDispatch()
  const columnOrder = ['toDo', 'inProgress', 'underReview', 'completed']

  const handleOnDragEnd = async movingTicket => {
    if (movingTicket) {
      const targetTicketId = movingTicket.draggableId
      const initialStatus = movingTicket.source.droppableId
      const targetStatus = movingTicket.destination.droppableId

      if (initialStatus !== targetStatus) {
        const updatedTicket = await saveTicketStatusChange({
          projectId,
          targetStatus,
          targetTicketId,
          initialStatus,
        })

        if (updatedTicket) {
          dispatch(
            updateTicketStatus({
              initialStatus,
              updatedTicket,
            })
          )
        } else {
          // todo: display error toast
        }
      }
    }
  }

  // TODO: Add indexing to columns
  return (
    <div className={'board-wrapper'}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columnOrder.map(columnStatus => (
          <StatusColumn columnStatus={columnStatus} />
        ))}
      </DragDropContext>
    </div>
  )
}
