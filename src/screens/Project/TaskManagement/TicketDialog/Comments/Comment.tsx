import '../../styles/Comments.scss'
import { useState } from 'react'
import { CommentHeader } from './CommentHeader'
import { CommentFooter } from './CommentFooter/CommentFooter'
import { CommentContent } from './CommentContent'
import { EditComment } from './EditComment'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'
import { generateDefaultPicture } from 'utils/helpers'
import { Replies } from './Replies'
import { CommentInterface } from 'interfaces'

interface CommentProps {
  comment: CommentInterface
  fetchComments: boolean
  isReply?: boolean
  toggleFetchComments: React.Dispatch<React.SetStateAction<boolean>>
}

export const Comment = ({
  comment,
  fetchComments,
  isReply,
  toggleFetchComments,
}: CommentProps) => {
  const { authorId, createdAt } = comment
  const [authorData] = useAppSelector(selectUsersById([authorId]))
  const [editMode, toggleEditMode] = useState(false)
  const { firstName, lastName, profilePicture } = authorData
  const authorProfilePicture =
    profilePicture || generateDefaultPicture(firstName, lastName)

  return (
    <>
      <div className='comment-container'>
        <img className='comment-thumbnail' src={authorProfilePicture} />
        {editMode ? (
          <EditComment
            comment={comment}
            toggleEditMode={toggleEditMode}
            toggleFetchComments={toggleFetchComments}
          />
        ) : (
          <div className='comment-card'>
            <CommentHeader authorId={authorId} createdAt={createdAt} />
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
      {!isReply && (
        <Replies
          parentComment={comment}
          toggleFetchComments={toggleFetchComments}
          fetchComments={fetchComments}
        />
      )}
    </>
  )
}
