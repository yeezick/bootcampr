export const CommentHeader = ({ author, userFriendlyTimeStamp }) => {
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
