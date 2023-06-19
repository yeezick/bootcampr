import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  ChatSelectedMemberInterface,
  ChatSliceInterface,
} from 'interfaces/ChatInterface'
import { RootState } from 'utils/redux/store'

// todo: chats from project slice should be moved here
// todo: looks like we are using this slice to handle individual instances of a chat
//    this should be handled by the local state of components and not in the central store
const initialState: ChatSliceInterface = {
  visibleChat: false,
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
  unreadMessages: 0,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: state => {
      state.visibleChat = !state.visibleChat
    },
    toggleChatClose: state => {
      state.visibleChat = false
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
      state._id = action.payload._id
      state.isGroup = action.payload.isGroup
      state.participants = action.payload.participants
      state.displayName = action.payload.displayName
    },
    setSelectedMember: (
      state,
      action: PayloadAction<ChatSelectedMemberInterface>
    ) => {
      state.selectedMember = action.payload
    },
    setUnreadMessages: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload
    },
  },
})

export const chatStatus = (state: RootState) => state.chat.visibleChat
export const selectConversation = (state: RootState) => state.chat
export const selectSelectedMember = (state: RootState) =>
  state.chat.selectedMember
export const {
  toggleChat,
  toggleChatClose,
  setCurrentConversation,
  setSelectedMember,
  setUnreadMessages,
} = chatSlice.actions
export default chatSlice.reducer
