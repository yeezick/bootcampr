export const formatTimestamp = timestamp => {
  const date = new Date(timestamp)
  const year = date.getFullYear().toString().slice(-2)
  const month = date.getMonth() + 1
  const day = ('0' + date.getDate()).slice(-2)
  let hours = date.getHours()
  hours = hours % 12
  hours = hours ? hours : 12
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hours}:${minutes} ${ampm}`
  return `${month}/${day}/${year}, ${formattedTime}`
}

export const formatLastMessageTimestamp = lastMessageTimestamp => {
  const now = new Date()
  const messageTime = new Date(lastMessageTimestamp)
  const timeDiff = now - messageTime
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}d`
  } else if (hours > 0) {
    return `${hours}h`
  } else if (minutes > 0) {
    return `${minutes}m`
  } else {
    return `${seconds}s`
  }
}
