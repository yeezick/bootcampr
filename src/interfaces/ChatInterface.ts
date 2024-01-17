import { ChatScreen } from 'utils/data/chatConstants'

export interface ChatSliceInterface {
  ui: {
    visibleChat: boolean
    chatScreen: ChatScreen
    chatScreenPath: ChatScreen[]
  }
  conversation: {
    _id: string
    isGroup: boolean
    participants: []
    displayName?: string
    selectedMember: ChatSelectedMemberInterface
  }
  unreadConversations: number
  chatText: ChatMessageInterface
}

export interface ChatMessageInterface {
  text: string
}

export interface ChatSelectedMemberInterface {
  _id: string
  firstName: string
  lastName: string
  profilePicture: string
}
