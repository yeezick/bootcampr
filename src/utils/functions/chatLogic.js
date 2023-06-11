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
