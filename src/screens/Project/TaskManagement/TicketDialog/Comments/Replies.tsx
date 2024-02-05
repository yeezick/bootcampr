import { useEffect, useState } from 'react'
import { getReplies } from 'utils/api/tickets'
import { Comment } from './Comment'
import { CommentType } from 'interfaces/TaskBoardInterface'
import { NewComment } from './InputBanner'

export const Replies = ({
  commentId,
  currentUser,
  toggleFetchComments,
  fetchComments,
  renderReplyInput,
  parentCommentId,
  toggleRenderReplyInput,
}) => {
  const [replies, setReplies] = useState([])

  const getCommentReplies = async commentId => {
    const response = await getReplies(commentId)
    setReplies(response)
  }

  useEffect(() => {
    getCommentReplies(commentId)
  }, [fetchComments])

  return (
    <div className='replies-container'>
      {replies.length > 0 &&
        replies?.map(reply => {
          return (
            <>
              <Comment
                comment={reply}
                toggleFetchComments={toggleFetchComments}
                fetchComments={fetchComments}
                currentUser={currentUser}
                key={reply._id}
              />
              {renderReplyInput && (
                <NewComment
                  commentType={CommentType.Reply}
                  user={currentUser}
                  toggleFetchComments={toggleFetchComments}
                  fetchComments={fetchComments}
                  parentComment={parentCommentId}
                  toggleRenderReplyInput={toggleRenderReplyInput}
                />
              )}
            </>
          )
        })}
    </div>
  )
}
