export const extractConversationAvatars = (chatMembers, authUserId) => {
  const avatars = chatMembers
    .filter(({ userInfo }) => userInfo && userInfo._id !== authUserId)
    .map(
      ({ userInfo }) => userInfo.profilePicture || getDefaultAvatar(userInfo)
    )

  return avatars
}

export const getDefaultAvatar = member => {
  const { firstName, lastName } = member
  const defaultImageURL = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=FFA726&color=1A237E&bold=true`
  return defaultImageURL
}

export const getInitials = (firstName, lastName) => {
  return `${firstName.split('')[0].toUpperCase()}${lastName
    .split('')[0]
    .toUpperCase()}`
}

export const getAllInvitedMembers = (
  currentParticipantsIds,
  selectedUserIds,
  authUserId
) => {
  const allUserIds = new Set(currentParticipantsIds)
  selectedUserIds.forEach(memberId => allUserIds.add(memberId))
  if (currentParticipantsIds.length === 0) {
    allUserIds.add(authUserId)
  }
  return allUserIds
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
    ? 'same-user'
    : 'other-user'

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
    ? 'chat-avatar'
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
    isSameSenderAsPrevious,
  }
}

export const getMissingMemberIds = (threads, members) => {
  const missingIds = []

  threads.forEach(thread => {
    thread.participants.forEach(participant => {
      if (!members[participant.userInfo]) {
        missingIds.push(participant.userInfo)
      }
    })
  })
  return missingIds
}

export const getParticipantsNames = (
  participants,
  chatType,
  groupName,
  authUser
) => {
  const participantsWithoutAuthUser = participants
    .filter(({ userInfo }) => userInfo._id !== authUser._id)
    .map(({ userInfo }) => `${userInfo.firstName} ${userInfo.lastName}`)
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
    if (ppA.userInfo._id === authUserId) return 1
    if (ppB.userInfo._id === authUserId) return -1

    const participantNameA = ppA.userInfo.firstName.toLocaleLowerCase()
    const participantNameB = ppB.userInfo.firstName.toLocaleLowerCase()
    if (participantNameA === participantNameB) return 0
    return participantNameA > participantNameB ? 1 : -1
  })
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

export const isMessageSameSender = (messages, m, i) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined)
  )
}

export const isMemberSelected = (selectedMembers, member) => {
  return selectedMembers.some(mem => mem._id === member._id)
}

export const isOnlyMessageBySameSender = (messages, i) => {
  const currentSender = messages[i].sender._id
  const previousSender = messages[i - 1]?.sender._id
  const nextSender = messages[i + 1]?.sender._id
  // Check if neither the previous nor the next message has the same sender as the current message
  return previousSender !== currentSender && nextSender !== currentSender
}

export const isRecipientMessageSameSender = (messages, m, i, authUserId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== authUserId
  )
}

export const isSameSenderAsPrevious = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id
}

export const isTeamMembersSelected = (
  currentParticipants,
  selectedUserIds,
  projectMembers,
  authUserId
) => {
  const currentParticipantsIds = currentParticipants.map(
    participant => participant.userInfo._id
  )

  const totalSelectedMembers = getAllInvitedMembers(
    currentParticipantsIds,
    selectedUserIds,
    authUserId
  )

  if (totalSelectedMembers.size !== projectMembers.length) return false
  else {
    return projectMembers.every(member => totalSelectedMembers.has(member._id))
  }
}

export const mapParticipantsWithMemberDetails = (chatRoom, members) => {
  return chatRoom.participants.map(pp => {
    const member = members[pp.userInfo]
    return member
      ? {
          ...pp,
          userInfo: {
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

export const mapMessageSender = (message, members) => {
  let messageSender
  if (message && message.sender) {
    if (message.isBotMessage) {
      messageSender = {
        _id: message.sender,
        firstName: 'Bootcampr',
        lastName: 'Admin',
      }
    } else {
      messageSender = members[message.sender]
    }
    return {
      ...message,
      sender: messageSender
        ? {
            _id: messageSender._id,
            firstName: messageSender.firstName || '',
            lastName: messageSender.lastName || '',
            email: messageSender.email || '',
            profilePicture: messageSender.profilePicture || '',
          }
        : message.sender,
    }
  }
  return message
}
