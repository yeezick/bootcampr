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

  let formattedTimestamp

  switch (true) {
    case days > 0:
      formattedTimestamp = `${days}d`
      break
    case hours > 0:
      formattedTimestamp = `${hours}h`
      break
    case minutes > 0:
      formattedTimestamp = `${minutes}m`
      break
    default:
      formattedTimestamp = `${seconds}s`
      break
  }

  return formattedTimestamp
}

export const isMemberSelected = (selectedMembers, member) => {
  return selectedMembers.some(mem => mem._id === member._id)
}

export const extractConversationAvatars = (chatMembers, authUserId) => {
  const avatars = chatMembers
    .filter(({ participant }) => participant && participant._id !== authUserId)
    .map(({ participant }) => participant.profilePicture)

  return avatars
}

export const isRecipientMessageSameSender = (messages, m, i, authUserId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== authUserId
  )
}

export const isMessageSameSender = (messages, m, i) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined)
  )
}

export const isLastMessageBySameRecipient = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  )
}

export const isLastMessageBySameUser = (messages, i) => {
  return i === messages.length - 1 && messages[messages.length - 1].sender._id
}

export const isFirstMessageBySameUser = (messages, i) => {
  if (i === 0) {
    return true
  } else {
    const currentSender = messages[i].sender._id
    const previousSender = messages[i - 1].sender._id
    return currentSender !== previousSender
  }
}

export const isOnlyMessageBySameSender = (messages, i) => {
  const currentSender = messages[i].sender._id
  const previousSender = messages[i - 1]?.sender._id
  const nextSender = messages[i + 1]?.sender._id

  // Check if neither the previous nor the next message has the same sender as the current message
  return previousSender !== currentSender && nextSender !== currentSender
}

export const isSameSenderAsPrevious = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id
}
