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
export const getParticipantsNames = (
  participants,
  chatType,
  groupName,
  authUser
) => {
  const participantsWithoutAuthUser = participants
    .filter(({ participant }) => participant._id !== authUser._id)
    .map(
      ({ participant }) => `${participant.firstName} ${participant.lastName}`
    )
    .join(', ')
  if (chatType === 'private') {
    return participantsWithoutAuthUser
  } else {
    const authUserName = `${authUser.firstName} ${authUser.lastName}`
    return groupName
      ? groupName
      : participantsWithoutAuthUser.concat(', ', authUserName)
  }
}
//Messages
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

export const getMessageClassNames = (messages, message, index, authUser) => {
  const isSenderAuthUser = message.sender._id === authUser._id

  const isSameUser = isSameSenderAsPrevious(messages, message, index)
    ? 'same-user-text-margin'
    : 'other-user-text-margin'

  const isLastMessageAndSameRecipient =
    isRecipientMessageSameSender(messages, message, index, authUser._id) ||
    isLastMessageBySameRecipient(messages, index, authUser._id)

  const isLastMessage =
    (isMessageSameSender(messages, message, index) ||
      isLastMessageBySameUser(messages, index)) &&
    'same-sender-last-message'

  const isFirstMessage =
    (isMessageSameSender(messages, message, index) ||
      isFirstMessageBySameUser(messages, index)) &&
    'same-sender-first-message'

  const isOnlyMessage =
    isOnlyMessageBySameSender(messages, index) && 'same-sender-one-message'

  const isAvatarDisplayed = isLastMessageAndSameRecipient
    ? 'avatar'
    : 'no-avatar'

  // const isMessageSelected = selectedMessages.includes(message)
  //   ? 'selected-message'
  //   : 'not-selected';

  const timestampClasses = isSenderAuthUser ? 'details-right' : 'details-left'

  return {
    isSameUser,
    isLastMessage,
    isFirstMessage,
    isOnlyMessage,
    isAvatarDisplayed,
    isLastMessageAndSameRecipient,
    // isMessageSelected,
    timestampClasses,
  }
}
