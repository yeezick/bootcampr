import { api } from './apiConfig'

export const getUserChatThreads = async () => {
  try {
    const res = await api.get('/chatThreads')
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
export const getUnreadChatMessageCount = async () => {
  try {
    const res = await api.get(`/chatTreads/unreadCount`)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getUserPrivateConversations = async userId => {
  try {
    const res = await api.get(`/${userId}/privateChats`)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createOrGetPrivateChatRoom = async recipientId => {
  try {
    const res = await api.post(`/privateChats`, { recipientId })
    return res.data.chatRoom
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getChatMessagesByType = async (chatId, chatType) => {
  try {
    if (chatType === 'group') {
      const res = await api.get(`/groupChats/${chatId}/messages`)
      return res.data.messages
    } else {
      const res = await api.get(`/privateChats/${chatId}/messages`)
      return res.data.messages
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createGroupChatRoom = async participantIds => {
  try {
    const res = await api.post(`/groupChats`, {
      participantIds: participantIds,
    })
    return res.data.chatRoom
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createGroupChatMessage = async (groupChatId, text) => {
  try {
    const res = await api.post(`/groupChats/${groupChatId}/messages`, {
      text,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
export const createPrivateMessage = async (privateChatId, text) => {
  try {
    const res = await api.post(`/privateChats/${privateChatId}/messages`, {
      text,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
export const updateGroupChat = async (groupChatId, data) => {
  try {
    const res = await api.put(`/groupChats/${groupChatId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
export const updateGroupChatParticipants = async (
  groupChatId,
  participantIds
) => {
  try {
    const res = await api.post(
      `/groupChats/${groupChatId}/participants`,
      participantIds
    )
    return res.data.chatRoom
  } catch (error) {
    console.error(error)
    return false
  }
}
