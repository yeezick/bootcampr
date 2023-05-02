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
