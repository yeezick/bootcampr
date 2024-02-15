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

export const getSortedParticipants = (participants, authUserId) => {
  return [...participants].sort((ppA, ppB) => {
    if (ppA.participant._id === authUserId) return 1
    if (ppB.participant._id === authUserId) return -1

    const participantNameA = ppA.participant.firstName.toLocaleLowerCase()
    const participantNameB = ppB.participant.firstName.toLocaleLowerCase()
    if (participantNameA === participantNameB) return 0
    return participantNameA > participantNameB ? 1 : -1
  })
}

export const mapParticipantsWithMemberDetails = (chatRoom, members) => {
  return chatRoom.participants.map(pp => {
    const member = members.find(member => member._id === pp.participant)
    return member
      ? {
          ...pp,
          participant: {
            _id: member._id,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            profilePicture: member.profilePicture,
          },
        }
      : pp
  })
}

export const updateLastMessageSender = (lastMessage, members) => {
  if (lastMessage && lastMessage.sender) {
    const setLastMessageSender = members.find(
      member => member._id === lastMessage.sender
    )
    return {
      ...lastMessage,
      sender: setLastMessageSender
        ? {
            _id: setLastMessageSender._id,
            firstName: setLastMessageSender.firstName,
            lastName: setLastMessageSender.lastName,
          }
        : lastMessage.sender,
    }
  }
  return lastMessage
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

export const getMessageClassNames = (
  messages,
  message,
  index,
  authUser,
  selectedMessages
) => {
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

  const isMessageSelected = selectedMessages.includes(message)
    ? 'selected-message'
    : 'not-selected'

  const timestampClasses = isSenderAuthUser ? 'details-right' : 'details-left'

  return {
    isSameUser,
    isLastMessage,
    isFirstMessage,
    isOnlyMessage,
    isAvatarDisplayed,
    isLastMessageAndSameRecipient,
    isMessageSelected,
    timestampClasses,
  }
}
