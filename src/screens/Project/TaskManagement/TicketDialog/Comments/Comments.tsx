import '../../styles/Comments.scss'
import { BiLike } from 'react-icons/bi'
import {
  createComment,
  getTicketComments,
  deleteComment,
  updateComment,
  getReplies,
} from 'utils/api/tickets'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { TicketTextLabel } from '../Fields'
import { InputAdornment, TextField } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

export const Comments = ({ ticketId }) => {
  const user = useSelector(selectAuthUser)
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
      <CommentInputBanner
        commentType={CommentType.Parent}
        ticketId={ticketId}
        user={user}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
      />
      <div className='render-comments'>
        {comments?.map(comment => (
          <Comment
            comment={comment}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            currentUser={user}
            key={comment._id}
          />
        ))}
      </div>
    </div>
  )
}

enum CommentType {
  Parent = 'PARENT',
  Reply = 'REPLY',
}

export const CommentInputBanner = ({
  commentType,
  parentComment = undefined,
  ticketId = undefined,
  user,
  fetchComments,
  toggleFetchComments,
  toggleRenderReplyInput = undefined,
}) => {
  let placeholderText =
    commentType === CommentType.Parent
      ? 'Give your feedback here.'
      : 'Reply to this comment.'
  const [inputText, setInputText] = useState('')
  const { _id, firstName, lastName, profilePicture } = user

  const createNewCommentOnEnter = async e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleCreateComment(e.target.value)
    }
  }

  const handleCreateComment = async inputText => {
    const content = inputText
    const isReply = commentType === CommentType.Reply
    const commentPayload = {
      author: {
        userId: _id,
        firstName,
        lastName,
        profilePicture,
      },
      content,
      parentComment,
      ticketId,
      isReply,
    }
    await createComment(commentPayload)
    setInputText('')
    if (isReply) {
      toggleRenderReplyInput(false)
    }
    toggleFetchComments(!fetchComments)
  }

  const handleInputChange = e => setInputText(e.target.value)
  const handleSendClick = () => handleCreateComment(inputText)

  return (
    <div className={`comment-input-banner ${commentType}`}>
      <img src={profilePicture} alt='commentor-profile-picture' />
      <TextField
        className='comment-input'
        onKeyUp={createNewCommentOnEnter}
        placeholder={placeholderText}
        value={inputText}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: <SendAdornment handleSendClick={handleSendClick} />,
        }}
        multiline
      />
    </div>
  )
}

const SendAdornment = ({ handleSendClick }) => (
  <InputAdornment
    onClick={handleSendClick}
    position='end'
    sx={{ cursor: 'pointer', marginLeft: 0, padding: '0 12px 0 16px' }}
  >
    <SendOutlinedIcon />
  </InputAdornment>
)
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
          <div className='comment-top-banner'>
            <div className='comment-author'>
              <p>
                {author.firstName} {author.lastName}
              </p>
            </div>
            <div className='comment-date-time'>
              <p>{userFriendlyTimeStamp}</p>
            </div>
          </div>
          <div className='comment-content'>
            {editMode ? (
              <input
                className='edit-comment'
                type='text'
                value={editedComment}
                onChange={e => setEditedComment(e.target.value)}
                onKeyUp={saveUpdatedComment}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
          <div className='comment-actions'>
            {author.userId !== currentUser._id && !isReply && (
              <div onClick={renderReplyInputBar}>
                <p>Reply</p>
              </div>
            )}
            {author.userId === currentUser._id && (
              <>
                <div onClick={allowEditComment}>
                  <p>Edit</p>
                </div>
                <div onClick={deleteThisComment}>
                  <p>Delete</p>
                </div>
              </>
            )}
            <div onClick={likeComment}>
              {/* make this conditionally filled or not depending on users like status */}
              <BiLike />
            </div>
            <div>
              {likes.length} Like{likes.length > 1 && 's'}
            </div>
          </div>
        </div>
      </div>
      <div>
        {!isReply && (
          <Replies
            commentId={_id}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            currentUser={currentUser}
          />
        )}
      </div>
      {renderReplyInput && (
        <div>
          <CommentInputBanner
            commentType={CommentType.Reply}
            user={currentUser}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            parentComment={_id}
            toggleRenderReplyInput={toggleRenderReplyInput}
          />
        </div>
      )}
    </div>
  )
}

const Replies = ({
  commentId,
  currentUser,
  toggleFetchComments,
  fetchComments,
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
            <Comment
              comment={reply}
              toggleFetchComments={toggleFetchComments}
              fetchComments={fetchComments}
              currentUser={currentUser}
              key={reply._id}
            />
          )
        })}
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
