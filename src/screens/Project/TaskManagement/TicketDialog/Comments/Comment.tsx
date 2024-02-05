import '../../styles/Comments.scss'
import { deleteComment, updateComment } from 'utils/api/tickets'
import { useState } from 'react'
import { Replies } from './Replies'
import { CommentHeader } from './CommentHeader'
import { CommentFooter } from './CommentFooter'
import { CommentContent } from './CommentContent'

export const Comment = ({
  comment,
  fetchComments,
  toggleFetchComments,
  currentUser,
}) => {
  const { author, content, createdAt, isReply, likes, _id } = comment
  const [editMode, toggleEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(content)
  const [renderReplyInput, toggleRenderReplyInput] = useState(false)
  const userFriendlyTimeStamp = convertTimeToStampUserFriendly(createdAt)

  const deleteThisComment = async () => {
    await deleteComment(_id)
    toggleFetchComments(!fetchComments)
  }

  const allowEditComment = () => {
    toggleEditMode(!editMode)
  }

  const saveUpdatedComment = async e => {
    if (e.key === 'Enter') {
      const commentUpdates = {
        content: editedComment,
      }
      await updateComment(_id, commentUpdates)
      toggleFetchComments(!fetchComments)
      toggleEditMode(false)
    }
  }

  const likeComment = async () => {
    let updatedLikes
    if (likes.includes(currentUser._id)) {
      const idx = likes.indexOf(currentUser._id)
      updatedLikes = {
        likes: likes.splice(idx, 1),
      }
    } else {
      updatedLikes = {
        likes: [...likes, currentUser._id],
      }
    }
    await updateComment(_id, updatedLikes)
    toggleFetchComments(!fetchComments)
  }

  const renderReplyInputBar = () => {
    toggleRenderReplyInput(!renderReplyInput)
  }

  return (
    <div className='comment-replies-container'>
      <div className='comment-container'>
        <img className='comment-thumbnail' src={author.profilePicture} />
        <div className='comment-card'>
          <CommentHeader
            author={author}
            userFriendlyTimeStamp={userFriendlyTimeStamp}
          />
          <CommentContent
            editMode={editMode}
            editedComment={editedComment}
            setEditedComment={setEditedComment}
            saveUpdatedComment={saveUpdatedComment}
            content={content}
          />
          <CommentFooter
            author={author}
            currentUser={currentUser}
            isReply={isReply}
            renderReplyInputBar={renderReplyInputBar}
            allowEditComment={allowEditComment}
            deleteThisComment={deleteThisComment}
            likeComment={likeComment}
            likes={likes}
          />
        </div>
      </div>
      <div>
        {!isReply && (
          <Replies
            commentId={_id}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            currentUser={currentUser}
            parentCommentId={_id}
            toggleRenderReplyInput={toggleRenderReplyInput}
            renderReplyInput={renderReplyInput}
          />
        )}
      </div>
    </div>
  )
}

const convertTimeToStampUserFriendly = timestamp => {
  const splitTimeStamp = timestamp.split('T')
  const rawDate = splitTimeStamp[0]
  const rawTime = splitTimeStamp[1]

  // make date user friendly
  const splitRawDate = rawDate.split('-')
  const userFriendlyDate = `${splitRawDate[1]}/${splitRawDate[2]}/${splitRawDate[0]}`

  // TODO: convert to user's timezone before adjusting hours and meridiem
  // make time user friendly
  const splitRawTime = rawTime.split(':')
  const rawHour = splitRawTime[0]
  const meridiem = rawHour >= 12 && rawHour !== 24 ? 'PM' : 'AM'
  const hour = rawHour < 12 ? rawHour : rawHour - 12
  const minutes = splitRawTime[1]
  const userFriendlyTime = `${hour}:${minutes} ${meridiem}`

  return `${userFriendlyDate}  ${userFriendlyTime}`
}
