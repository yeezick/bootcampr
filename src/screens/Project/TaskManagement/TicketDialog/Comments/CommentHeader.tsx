export const CommentHeader = ({ author, createdAt }) => {
  const userFriendlyTimeStamp = convertTimeToStampUserFriendly(createdAt)

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

const convertTimeToStampUserFriendly = timestamp => {
  const splitTimeStamp = timestamp.split('T')
  const rawDate = splitTimeStamp[0]
  const rawTime = splitTimeStamp[1]

  // make date user friendly
  const splitRawDate = rawDate.split('-')
  const userFriendlyDate = `${splitRawDate[1]}/${splitRawDate[2]}/${splitRawDate[0]}`

  // TODO: convert to user's timezone before adjusting hours and meridiem
  // make time user friendly
  const splitRawTime = rawTime.split(':')
  const rawHour = splitRawTime[0]
  const meridiem = rawHour >= 12 && rawHour !== 24 ? 'PM' : 'AM'
  const hour = rawHour < 12 ? rawHour : rawHour - 12
  const minutes = splitRawTime[1]
  const userFriendlyTime = `${hour}:${minutes} ${meridiem}`

  return `${userFriendlyDate}  ${userFriendlyTime}`
}
