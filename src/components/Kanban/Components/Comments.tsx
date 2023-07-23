import { BiComment } from 'react-icons/bi'
import './Comments.scss'
import {
  createComment,
  getTicketComments,
  deleteComment,
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

export const Comment = ({ comment, fetchComments, toggleFetchComments }) => {
  const { author, content, createdAt, isReply, likes, replies, _id } = comment

  const deleteThisComment = async () => {
    console.log('deleting comment: ' + _id)
    await deleteComment(_id)
    toggleFetchComments(!fetchComments)
  }

  useEffect(() => {
    console.log(comment)
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
            <p>{createdAt}</p>
          </div>
        </div>
        <div className='comment-content'>
          <p>{content}</p>
        </div>
        <div className='comment-actions'>
          <div>Reply</div>
          <div>Edit</div>
          <div onClick={deleteThisComment}>
            <p>Delete</p>
          </div>
          <div>Like</div>
          <div>Likes</div>
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

const sampleParentComment = {
  author: 'Jeanine Bootcampr',
  thumbnail: '',
  timestamp: '',
  content: '',
  likes: [],
  replies: [],
}
