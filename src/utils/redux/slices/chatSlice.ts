import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  ChatSelectedMemberInterface,
  ChatSliceInterface,
} from 'interfaces/ChatInterface'
import { ChatScreen } from 'utils/data/chatConstants'
import { RootState } from 'utils/redux/store'

// todo: chats from project slice should be moved here
// todo: looks like we are using this slice to handle individual instances of a chat
//    this should be handled by the local state of components and not in the central store
const initialState: ChatSliceInterface = {
  ui: {
    visibleChat: false,
    chatScreen: ChatScreen.Main,
    chatScreenPath: [ChatScreen.Main],
  },
  conversation: {
    _id: '',
    isGroup: false,
    participants: [],
    displayName: '',
    selectedMember: {
      _id: '',
      firstName: '',
      lastName: '',
      profilePicture: '',
    },
  },
  unreadConversations: 0,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: state => {
      if (state.ui.visibleChat) {
        state.ui.chatScreen = ChatScreen.Main
        state.ui.chatScreenPath = [ChatScreen.Main]
      }
      state.ui.visibleChat = !state.ui.visibleChat
    },
    toggleChatOpen: state => {
      state.ui.visibleChat = true
    },
    toggleChatClose: state => {
      state.ui.visibleChat = false
      state.ui.chatScreen = ChatScreen.Main
      state.ui.chatScreenPath = [ChatScreen.Main]
    },
    onScreenUpdate: (state, action: PayloadAction<ChatScreen>) => {
      state.ui.chatScreenPath = [...state.ui.chatScreenPath, action.payload]
      state.ui.chatScreen = action.payload
    },
    onBackArrowClick: state => {
      if (state.ui.chatScreenPath.length > 1) {
        state.ui.chatScreenPath.pop()
        state.ui.chatScreen =
          state.ui.chatScreenPath[state.ui.chatScreenPath.length - 1]
      }
    },
    setCurrentConversation: (
      state,
      action: PayloadAction<{
        _id: string
        isGroup: boolean
        participants?: any
        displayName?: string
        selectedMember?: ChatSelectedMemberInterface
      }>
    ) => {
      state.conversation._id = action.payload._id
      state.conversation.isGroup = action.payload.isGroup
      state.conversation.participants = action.payload.participants
      state.conversation.displayName = action.payload.displayName
    },
    setSelectedMember: (
      state,
      action: PayloadAction<ChatSelectedMemberInterface>
    ) => {
      state.conversation.selectedMember = action.payload
    },
    setUnreadMessages: (state, action: PayloadAction<number>) => {
      state.unreadConversations = action.payload
    },
  },
})

export const selectChatUI = (state: RootState) => state.chat.ui
export const selectConversation = (state: RootState) => state.chat.conversation
export const selectSelectedMember = (state: RootState) =>
  state.chat.conversation.selectedMember
export const {
  toggleChat,
  toggleChatOpen,
  toggleChatClose,
  onScreenUpdate,
  onBackArrowClick,
  setCurrentConversation,
  setSelectedMember,
  setUnreadMessages,
} = chatSlice.actions
export default chatSlice.reducer
