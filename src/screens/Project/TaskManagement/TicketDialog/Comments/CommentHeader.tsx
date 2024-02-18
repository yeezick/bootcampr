import { generateDayJs } from 'utils/helpers'

export const CommentHeader = ({ author, createdAt }) => {
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
