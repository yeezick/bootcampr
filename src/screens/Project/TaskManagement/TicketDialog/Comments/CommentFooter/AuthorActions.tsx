import { Button } from '@mui/material'
import { deleteComment } from 'utils/api/tickets'
import { fetchIcon } from 'utils/components/Icons'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const AuthorActions = ({
  authorId,
  commentId,
  toggleEditMode,
  toggleFetchComments,
}) => {
  const userId = useAppSelector(selectUserId)
  const allowEditComment = () => toggleEditMode(state => !state)
  const deleteThisComment = async () => {
    await deleteComment(commentId)
    toggleFetchComments(state => !state)
  }

  if (authorId === userId) {
    return (
      <div className='author-actions'>
        <Button onClick={allowEditComment} sx={{ minWidth: '0' }}>
          Edit
        </Button>
        {fetchIcon('circle')}
        <Button onClick={deleteThisComment}>Delete</Button>
      </div>
    )
  }
}
