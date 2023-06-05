import { api } from './apiConfig'

export const getAllConversations = async userId => {
  try {
    const res = await api.get(`/users/${userId}/messages`)
    return res.data.combinedThreads
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getAllPrivateMessages = async (userId, privateChatId) => {
  try {
    const res = await api.get(`/${userId}/privateChats/${privateChatId}`)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getAllGroupMessages = async (userId, groupChatId) => {
  try {
    const res = await api.get(`/${userId}/groupChats/${groupChatId}`)
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

export const createGroupChatRoom = async (
  userId,
  participants,
  displayName
) => {
  try {
    const res = await api.post(`/${userId}/groupChats`, {
      participants: participants,
      groupName: displayName,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createPrivateMessage = async (userId, privateChatId, text) => {
  try {
    const res = await api.post(`/${userId}/privateChats/${privateChatId}`, {
      text,
    })
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createGroupMessage = async (userId, groupChatId, text) => {
  try {
    const res = await api.post(`/${userId}/groupChats/${groupChatId}`, { text })
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

export const updatePrivateMessageReadStatus = async (userId, privateChatId) => {
  try {
    const res = await api.put(
      `/users/${userId}/privateChats/${privateChatId}/lastMessage`
    )
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateGroupMessageReadStatus = async (userId, groupChatId) => {
  try {
    const res = await api.put(
      `/users/${userId}/groupChats/${groupChatId}/lastMessage`
    )
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateGroupChat = async (userId, groupChatId, data) => {
  try {
    const res = await api.put(`/${userId}/groupChats/${groupChatId}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
