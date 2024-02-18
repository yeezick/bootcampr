import '../../styles/Comments.scss'
import { useState } from 'react'
import { Replies } from './Replies'
import { CommentHeader } from './CommentHeader'
import { CommentFooter } from './CommentFooter/CommentFooter'
import { CommentContent } from './CommentContent'

export const Comment = ({ comment, fetchComments, toggleFetchComments }) => {
  const { author, content, createdAt } = comment
  const [editMode, toggleEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(content)
  const [renderReplyInput, toggleRenderReplyInput] = useState(false)

  return (
    <div className='comment-replies-container'>
      <div className='comment-container'>
        <img className='comment-thumbnail' src={author.profilePicture} />
        <div className='comment-card'>
          <CommentHeader author={author} createdAt={createdAt} />
          <CommentContent
            comment={comment}
            editMode={editMode}
            editedComment={editedComment}
            setEditedComment={setEditedComment}
            toggleEditMode={toggleEditMode}
            toggleFetchComments={toggleFetchComments}
          />
          <CommentFooter
            comment={comment}
            fetchComments={fetchComments}
            toggleRenderReplyInput={toggleRenderReplyInput}
            toggleEditMode={toggleEditMode}
            toggleFetchComments={toggleFetchComments}
          />
        </div>
      </div>
      <Replies
        comment={comment}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
        toggleRenderReplyInput={toggleRenderReplyInput}
        renderReplyInput={renderReplyInput}
      />
    </div>
  )
}
