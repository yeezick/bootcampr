import { useEffect, useState } from 'react'
import { TicketTextLabel } from '../Fields'
import { NewComment } from './NewComment'
import { Comment } from './Comment'
import { getTicketComments } from 'utils/api/comments'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectFetchComments,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'

export const TaskComments = () => {
  const { _id: ticketId } = useAppSelector(selectTicketFields)
  const fetchComments = useAppSelector(selectFetchComments)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = async () => {
      const response = await getTicketComments(ticketId)
      setComments(response)
    }
    getComments()
  }, [fetchComments])

  return (
    <div className='comments-container'>
      <TicketTextLabel icon={'chatBubble'} label='Comments' />
      <NewComment />
      <div>
        {comments?.map(comment => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
    </div>
  )
}
