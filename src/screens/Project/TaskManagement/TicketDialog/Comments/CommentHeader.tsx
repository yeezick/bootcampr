import { generateDayJs } from 'utils/helpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'

export const CommentHeader = ({ authorId, createdAt }) => {
  const [author] = useAppSelector(selectUsersById([authorId]))
  const userFriendlyTimeStamp =
    generateDayJs(createdAt).format('MM/DD/YYYY hh:mm A')

  return (
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
  )
}
