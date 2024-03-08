import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import {
  moveTicketBetweenColumns,
  reorderColumn,
  selectProjectTracker,
} from 'utils/redux/slices/projectSlice'
import { StatusColumn } from './StatusColumn'
import '../../styles/BoardColumnStyles.scss'
import { doTicketsExist } from 'utils/helpers/taskHelpers'
import { DragDropContext } from 'react-beautiful-dnd'
import { moveTicketColumn, reorderProjectColumn } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const BoardColumns = () => {
  const { projectId } = useParams()
  const projectTracker = useAppSelector(selectProjectTracker)
  const dispatch = useAppDispatch()
  const columnOrder = ['toDo', 'inProgress', 'underReview', 'completed']
  const classes = doTicketsExist(projectTracker)
    ? 'columns-wrapper full-height'
    : 'columns-wrapper'

  const handleOnDragEnd = async movingTicket => {
    const { source, destination } = movingTicket

    // dropped outside any columns or in its original position
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      const response = await reorderProjectColumn(projectId, {
        columnId: source.droppableId,
        oldIdx: source.index,
        newIdx: destination.index,
      })

      if (response.status !== 200) {
        dispatch(errorSnackbar(response.message))
      } else {
        dispatch(
          reorderColumn({
            columnId: source.droppableId,
            reorderedColumn: response.reorderedColumn,
          })
        )
      }
    } else {
      const response = await moveTicketColumn(projectId, {
        oldColumnId: source.droppableId,
        oldColumnIdx: source.index,
        newColumnId: destination.droppableId,
        newColumnIdx: destination.index,
      })

      if (response.status !== 200) {
        dispatch(errorSnackbar(response.message))
      } else {
        dispatch(
          moveTicketBetweenColumns({
            newColumnId: destination.droppableId,
            newColumn: response.newColumn,
            oldColumnId: source.droppableId,
            oldColumn: response.oldColumn,
          })
        )
      }
    }
  }

  return (
    <div className={classes}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columnOrder.map(columnStatus => (
          <StatusColumn key={columnStatus} columnStatus={columnStatus} />
        ))}
      </DragDropContext>
    </div>
  )
}
