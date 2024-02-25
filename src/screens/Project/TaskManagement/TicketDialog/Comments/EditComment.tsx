import { useState } from 'react'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch } from 'utils/redux/hooks'
import { CommentHeader } from './CommentHeader'
import { TextField } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { updateComment } from 'utils/api/comments'

export const EditComment = ({
  comment,
  toggleEditMode,
  toggleFetchComments,
}) => {
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
