import { useEffect, useState } from 'react'
import { getReplies } from 'utils/api/tickets'
import { Comment } from './Comment'
import { CommentType } from 'interfaces/TaskBoardInterface'
import { NewComment } from './InputBanner'

export const Replies = ({
  comment,
  toggleFetchComments,
  fetchComments,
  renderReplyInput,
  toggleRenderReplyInput,
}) => {
  const [replies, setReplies] = useState([])
  const { isReply, _id: commentId } = comment
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
              <>
                <Comment
                  comment={reply}
                  toggleFetchComments={toggleFetchComments}
                  fetchComments={fetchComments}
                  key={reply._id}
                />
                {renderReplyInput && (
                  <NewComment
                    commentType={CommentType.Reply}
                    toggleFetchComments={toggleFetchComments}
                    fetchComments={fetchComments}
                    parentComment={commentId}
                    toggleRenderReplyInput={toggleRenderReplyInput}
                  />
                )}
              </>
            )
          )
        })}
    </div>
  )
}
