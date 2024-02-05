import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { createComment } from 'utils/api/tickets'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { CommentType } from 'interfaces/TaskBoardInterface'

export const NewComment = ({
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
