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
    return res.data.combinedMessages
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getAllGroupMessages = async (userId, groupChatId) => {
  try {
    const res = await api.get(`/${userId}/groupChats/${groupChatId}`)
    return res.data.combinedMessages
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
    console.log('new private chat room (res.data):', res.data)
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
    console.log('new group chat room (res.data):', res.data)
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
    console.log('A new private text was sent:', res.data)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const createGroupMessage = async (userId, groupChatId, text) => {
  try {
    const res = await api.post(`/${userId}/groupChats/${groupChatId}`, { text })
    console.log('A new group text was sent:', res.data)
    return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getGroupChatByChatId = async groupChatId => {
  try {
    const res = await api.get(`/groupChats/${groupChatId}`)
    console.log('retrieve current group chat:', res.data.groupChatThread)
    return res.data.groupChatThread
  } catch (error) {
    console.error(error)
    return false
  }
}
