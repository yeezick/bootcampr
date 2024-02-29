import { useEffect, useState } from 'react'
import { Comment } from './Comment'
import { CommentType } from 'interfaces/TaskBoardInterface'
import { NewComment } from './InputBanner'
import { getReplies } from 'utils/api/comments'

export const Replies = ({
  parentComment,
  toggleFetchComments,
  fetchComments,
}) => {
  const [replies, setReplies] = useState([])
  const { isReply, _id: commentId } = parentComment
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
            !isReply && (
              <Comment
                comment={reply}
                toggleFetchComments={toggleFetchComments}
                fetchComments={fetchComments}
                key={reply._id}
              />
            )
          )
        })}
      <NewComment
        commentType={CommentType.Reply}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
        parentComment={commentId}
      />
    </div>
  )
}
