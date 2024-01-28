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
export const getUserPrivateConversations = async userId => {
  try {
    const res = await api.get(`/${userId}/privateChats`)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createPrivateChatRoom = async (userId, recipientEmail) => {
  try {
    const res = await api.post(`/${userId}/privateChats`, {
      email: `${recipientEmail}`,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
export const createPrivateMessage = async (privateChatId, text) => {
  try {
    const res = await api.post(`/privateChats/${privateChatId}`, {
      text,
    })
    return res.data.messages
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getChatMessagesByType = async (chatId, chatType) => {
  try {
    if (chatType === 'group') {
      const res = await api.get(`/groupChats/${chatId}/messages`)
      console.log(res.data)
      return res.data.messages
    } else {
      const res = await api.get(`/privateChats/${chatId}`)
      return res.data
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
    return res.data
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

export const getGroupChatByChatId = async groupChatId => {
  try {
    const res = await api.get(`/groupChats/${groupChatId}`)
    return res.data.groupChatThread
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateGroupChat = async (userId, groupChatId, data) => {
  try {
    const res = await api.put(`/user/groupChats/${groupChatId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
