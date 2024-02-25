import { ChatScreen } from 'utils/data/chatConstants'
import { BasicUserInfoInterface, UserInterface } from './UserInterface'

export interface ChatSliceInterface {
  activeChatRoomId: string
  chat: ChatInterface
  chatText: string
  selectedChatUsers: UserInterface[]
  threads: Record<string, ChatInterface>
  ui: {
    chatScreen: ChatScreen
    chatScreenPath: ChatScreen[]
    visibleChat: boolean
  }
}

export interface ChatInterface {
  _id?: string
  chatType: 'group' | 'private'
  groupDescription?: string
  groupName?: string
  groupPhoto?: string
  lastActive?: string
  lastMessage?: {
    sender: BasicUserInfoInterface
    text: string
    timestamp: string
  }
  messages: ChatMessageInterface[]
  participants: ParticipantInterface[]
  typingUsers?: string[]
}

export interface ChatMessageInterface {
  _id?: string
  isBotMessage?: boolean
  sender: BasicUserInfoInterface
  status?: 'sent' | 'read' | 'failed'
  text: string
  timestamp: string
}

export interface EmptyChatPage {
  className: string
  screen: string
  text: string
}

export interface FetchMessagesPayload {
  chatId: string
  messages: ChatMessageInterface[]
}

export interface ParticipantInterface {
  hasUnreadMessage?: boolean
  isAdmin?: boolean
  participant: BasicUserInfoInterface
}
