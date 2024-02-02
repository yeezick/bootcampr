import { ChatScreen } from 'utils/data/chatConstants'
import { BasicUserInfoInterface, UserInterface } from './UserInterface'

export interface ChatSliceInterface {
  ui: {
    visibleChat: boolean
    chatScreen: ChatScreen
    chatScreenPath: ChatScreen[]
  }
  chat: ChatInterface
  threads: Record<string, ChatInterface>
  selectedChatUsers: UserInterface[]
  chatText: string
  unreadConversationsCount: number
  isChatRoomActive: boolean
}
export interface ChatInterface {
  _id?: string
  lastMessage?: {
    text: string
    sender: BasicUserInfoInterface
    timestamp: string
  }
  participants: ParticipantInterface[]
  typingUsers?: string[]
  messages: ChatMessageInterface[]
  chatType: 'group' | 'private'
  groupName?: string
  groupDescription?: string
  groupPhoto?: string
  lastActive?: string
}

export interface ParticipantInterface {
  participant: BasicUserInfoInterface
  isAdmin?: boolean
  hasUnreadMessage?: boolean
}
export interface ChatMessageInterface {
  _id?: string
  text: string
  sender: BasicUserInfoInterface
  timestamp: string
  status?: 'sent' | 'read' | 'failed'
}

export interface EmptyChatPage {
  screen: string
  text: string
  className: string
}
export interface FetchMessagesPayload {
  chatId: string
  messages: ChatMessageInterface[]
}
