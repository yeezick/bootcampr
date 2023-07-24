import { BiComment, BiLike } from 'react-icons/bi'
import './Comments.scss'
import {
  createComment,
  getTicketComments,
  deleteComment,
  updateComment,
} from 'utils/api/tickets'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser, selectUserId } from 'utils/redux/slices/userSlice'

export const Comments = ({ ticketId }) => {
  const user = useSelector(selectAuthUser)
  const [comments, setComments] = useState([])
  const [fetchComments, toggleFetchComments] = useState(false)

  const getComments = async () => {
    const response = await getTicketComments(ticketId)
    setComments(response.comments)
    console.log(comments)
  }

  useEffect(() => {
    getComments()
    console.log(user)
  }, [fetchComments])

  return (
    <div className='comments-container'>
      {/* note: may want to move this label outside of Comments component for easier style management with other TicketDetail Icons */}
      <div className='comments-section-label'>
        <BiComment className='ticket-icon' />
        <h4>Comments</h4>
      </div>
      <CommentInputBanner
        commentType={CommentType.Parent}
        ticketId={ticketId}
        user={user}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
      />
      <div className='render-comments'>
        {comments.map(comment => (
          <Comment
            comment={comment}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            currentUser={user}
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

// TODO: figure out how to properly add the CommentType Enum to type this
export const CommentInputBanner = ({
  commentType,
  parentComment = undefined,
  ticketId,
  user,
  fetchComments,
  toggleFetchComments,
}) => {
  let placeholderText =
    commentType === CommentType.Parent
      ? 'Give your feedback here.'
      : 'Reply to this comment.'

  const [inputText, setInputText] = useState('')

  const createNewComment = async e => {
    if (e.key === 'Enter') {
      const author = {}
      const content = e.target.value
      const isReply = commentType === CommentType.Reply

      const { _id, firstName, lastName, profilePicture } = user

      const response = await createComment({
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
      })

      setInputText('')
    }
    toggleFetchComments(!fetchComments)
  }

  return (
    <div className='comment-input-banner'>
      <img src='' />
      <input
        onKeyUp={createNewComment}
        type='text'
        placeholder={placeholderText}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
    </div>
  )
}

export const Comment = ({
  comment,
  fetchComments,
  toggleFetchComments,
  currentUser,
}) => {
  const { author, content, createdAt, isReply, likes, replies, _id } = comment
  const [editMode, toggleEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(content)

  const userFriendlyTimeStamp = convertTimeToStampUserFriendly(createdAt)

  const deleteThisComment = async () => {
    console.log('deleting comment: ' + _id)
    await deleteComment(_id)
    toggleFetchComments(!fetchComments)
  }

  const allowEditComment = () => {
    console.log('User would like to edit comment')
    toggleEditMode(!editMode)
  }

  // change name to update content
  const saveUpdatedComment = async e => {
    console.log(e.key)
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
    console.log(`${currentUser._id} wants to like commment: ${_id}`)
    console.log(likes)
    console.log(currentUser._id)
    const updatedLikes = {
      likes: [...likes, currentUser._id],
    }
    console.log(updatedLikes)
    await updateComment(_id, updatedLikes)
    toggleFetchComments(!fetchComments)
  }

  useEffect(() => {
    // console.log(currentUser)
  })
  return (
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
          {/* since this check is happening twice, make this render as an either or */}
          {author.userId !== currentUser._id && <div>Reply</div>}
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
    // <div className='single-comment'>
    //     Single comment component
    //     <div>
    //         Base/Core/Parent Comment
    //         Contains:
    //         - author thumbnail
    //         - author userName
    //         - date and time Created
    //         - comment text / content
    //         - edit if user is author
    //         - delete if user is author
    //         - like if user is author?
    //         - reply if user is not author
    //         - like if user is not author
    //     </div>
    //     <div>
    //         Replies
    //         Replies will look the same as a base comment, but shifted visual to the right (indented)
    //         the reply button on a reply comment will still reference its parent commentId so that the reply remains a single nested response, and will automatically be in the right order thanks to timestamp
    //         if reply button is clicked, a nested comment input bar will appear under said comment
    //     </div>
    // </div>
  )
}

const convertTimeToStampUserFriendly = timestamp => {
  let userFriendlyTimeStamp = 'MM/DD/YYYY HH:MM xm'
  const splitTimeStamp = timestamp.split('T')
  const rawDate = splitTimeStamp[0]
  const rawTime = splitTimeStamp[1]
  const splitRawDate = rawDate.split('-')
  const userFriendlyDate = `${splitRawDate[1]}/${splitRawDate[2]}/${splitRawDate[0]}`

  // convert to user's timezone before adjusting hours and meridiem
  const splitRawTime = rawTime.split(':')
  const rawHour = splitRawTime[0]
  const meridiem = rawHour >= 12 && rawHour !== 24 ? 'PM' : 'AM'
  const hour = rawHour <= 12 ? rawHour : rawHour - 12
  const minutes = splitRawTime[1]

  const userFriendlyTime = `${hour}:${minutes} ${meridiem}`

  return `${userFriendlyDate} ${userFriendlyTime}`
}
