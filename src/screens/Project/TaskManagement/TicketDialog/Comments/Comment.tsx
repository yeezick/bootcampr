import '../../styles/Comments.scss'
import { useState } from 'react'
import { CommentHeader } from './CommentHeader'
import { CommentFooter } from './CommentFooter/CommentFooter'
import { CommentContent } from './CommentContent'
import { TextField } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { updateComment } from 'utils/api/tickets'
import { useAppDispatch } from 'utils/redux/hooks'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'

export const Comment = ({ comment, fetchComments, toggleFetchComments }) => {
  const { author, content, createdAt } = comment
  const [editMode, toggleEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(content)

  return (
    <div className='comment-container'>
      <img className='comment-thumbnail' src={author.profilePicture} />
      {editMode ? (
        <EditComment
          comment={comment}
          toggleEditMode={toggleEditMode}
          toggleFetchComments={toggleFetchComments}
        />
      ) : (
        <div className='comment-card'>
          <CommentHeader author={author} createdAt={createdAt} />
          <CommentContent comment={comment} />
          <CommentFooter
            comment={comment}
            fetchComments={fetchComments}
            toggleEditMode={toggleEditMode}
            toggleFetchComments={toggleFetchComments}
          />
        </div>
      )}
    </div>
  )
}

const EditComment = ({ comment, toggleEditMode, toggleFetchComments }) => {
  const { author, _id: commentId, content, createdAt } = comment
  const [updatedComment, setUpdatedComment] = useState(content)
  const dispatch = useAppDispatch()
  const handleCancel = () => toggleEditMode(false)
  const handleInputChange = e => setUpdatedComment(e.target.value)

  const handleSave = async e => {
    const updateResponse = await updateComment(commentId, {
      content: updatedComment,
    })

    if (updateResponse.status === 200) {
      dispatch(successSnackbar('Changes saved!'))
    } else {
      dispatch(errorSnackbar(updateResponse.error.message))
    }

    toggleFetchComments(state => !state)
    toggleEditMode(false)
  }

  return (
    <div className='edit-comment'>
      <div className='comment-card'>
        <CommentHeader author={author} createdAt={createdAt} />
        <TextField
          value={updatedComment}
          onChange={handleInputChange}
          multiline
        />
      </div>
      <div className='edit-buttons'>
        <SecondaryButton text='Cancel' handler={handleCancel} />
        <PrimaryButton text='Save' handler={handleSave} />
      </div>
    </div>
  )
}
