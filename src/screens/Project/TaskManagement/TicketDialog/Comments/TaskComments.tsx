import { useEffect, useState } from 'react'
import { TicketTextLabel } from '../Fields'
import { NewComment } from './InputBanner'
import { Comment } from './Comment'
import { CommentType } from 'interfaces/TaskBoardInterface'
import { Replies } from './Replies'
import { getTicketComments } from 'utils/api/comments'

export const TaskComments = ({ ticketId }) => {
  const [comments, setComments] = useState([])
  // BC-763: High priority! Makes an API call for each reply thread for every comment action
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
        commentType={CommentType.Parent}
        ticketId={ticketId}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
      />
      <div>
        {comments?.map(comment => (
          <>
            <Comment
              comment={comment}
              toggleFetchComments={toggleFetchComments}
              fetchComments={fetchComments}
              key={comment._id}
            />
            {/* <Replies // Need ticket to fix 
              parentComment={comment}
              toggleFetchComments={toggleFetchComments}
              fetchComments={fetchComments}
            /> */}
          </>
        ))}
      </div>
    </div>
  )
}
