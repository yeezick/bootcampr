import { useEffect, useState } from 'react'
import { TicketTextLabel } from '../Fields'
import { NewComment } from './NewComment'
import { Comment } from './Comment'
import { getTicketComments } from 'utils/api/comments'
import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'

export const TaskComments = () => {
  const { _id: ticketId } = useAppSelector(selectTicketFields)
  const [comments, setComments] = useState([])
  const [fetchComments, toggleFetchComments] = useState(false)

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
      <NewComment
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
      />
      <div>
        {comments?.map(comment => (
          <Comment
            comment={comment}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            key={comment._id}
          />
        ))}
      </div>
    </div>
  )
}
