import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from '@reduxjs/toolkit'
import {
  ChatMessage,
  ChatSliceInterface,
  ChatInterface,
  Participant,
} from 'interfaces/ChatInterface'
import { getChatMessagesByType, getUserChatThreads } from 'utils/api/chat'
import { ChatScreen } from 'utils/data/chatConstants'
import { RootState } from 'utils/redux/store'

// todo: chats from project slice should be moved here
const initialState: ChatSliceInterface = {
  ui: {
    visibleChat: false,
    chatScreen: ChatScreen.Main,
    chatScreenPath: [ChatScreen.Main],
  },
  chat: {
    _id: '',
    participants: [],
    typingUsers: [],
    messages: [],
    lastMessage: {
      sender: {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        profilePicture: '',
      },
      text: '',
      timestamp: '',
    },
    lastActive: '',
    chatType: null,
    groupName: '',
    groupDescription: '',
    groupPhoto: '',
  },
  threads: [],
  selectedChatUsers: [],
  isChatRoomActive: false,
  unreadConversationsCount: 0,
  chatText: '',
}
interface FetchMessagesPayload {
  chatId: string
  messages: ChatMessage[]
}
export const fetchMessages = createAsyncThunk<
  FetchMessagesPayload,
  { chatId: string; chatType: 'group' | 'private' }
>('chatbox/fetchMessages', async ({ chatId, chatType }, thunkAPI) => {
  try {
    const messages = await getChatMessagesByType(chatId, chatType)
    return { chatId, messages }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
export const fetchThreads = createAsyncThunk<ChatInterface[]>(
  'chatbox/fetchThreads',
  async (_, thunkAPI) => {
    try {
      const threads = await getUserChatThreads()
      return threads
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
const chatSlice = createSlice({
  name: 'chatbox',
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
    setCurrentChat: (
      state,
      action: PayloadAction<{
        chatId: string
        chatType?: 'group' | 'private'
        participants?: Participant[]
      }>
    ) => {
      const { chatId, chatType, participants } = action.payload
      const selectedThread = state.threads.find(thread => thread._id === chatId)
      if (selectedThread) {
        state.chat = { ...selectedThread, messages: [] }
      } else {
        //when a new chat room is created
        state.chat = {
          _id: chatId,
          chatType: chatType,
          participants: participants,
          messages: [],
        }
      }
    },
    updateCurrentChatMessages: (state, action) => {
      const { receivedMessage, activeUserId } = action.payload
      const threadIndex = state.threads.findIndex(
        thread => thread._id === receivedMessage.chatRoomId
      )

      if (threadIndex !== -1) {
        const senderParticipant = state.threads[threadIndex].participants.find(
          pp => pp.participant._id === receivedMessage.senderId
        )
        if (!senderParticipant) {
          return
        }
        const newMessage: ChatMessage = {
          sender: senderParticipant.participant,
          text: receivedMessage.newMessage,
          timestamp: new Date().toISOString(),
          status: 'sent',
        }

        state.threads[threadIndex].lastMessage = newMessage
        console.log(current(state.chat))
        if (state.chat._id === receivedMessage.chatRoomId) {
          state.chat.messages = [...state.chat.messages, newMessage]
          state.chat.lastMessage = newMessage
        }
        state.threads[threadIndex].participants.forEach(participant => {
          if (participant.participant._id !== newMessage.sender._id) {
            // Mark as unread only if the active user is not currently viewing the chat

            participant.hasUnreadMessage =
              state.chat._id !== receivedMessage.chatRoomId ||
              participant.participant._id !== activeUserId
          }
        })
      }
    },

    setChatText: (state, action: PayloadAction<string>) => {
      state.chatText = action.payload
    },
    setUnreadChatsCount: (state, action: PayloadAction<number>) => {
      console.log(action.payload)
      state.unreadConversationsCount = action.payload
    },
    setChatRoomActive: (state, action) => {
      state.isChatRoomActive = action.payload
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { chatId, messages } = action.payload
        const thread = state.threads.find(thread => thread._id === chatId)

        if (thread) {
          thread.messages = messages
        }
        //To update the messages of the currently active chat
        if (state.chat && state.chat._id === chatId) {
          state.chat.messages = messages
        }
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.threads = action.payload
      })
  },
})

export const selectChatUI = (state: RootState) => state.chatbox.ui
export const selectThreads = (state: RootState) => state.chatbox.threads
export const selectChat = (state: RootState) => state.chatbox.chat
export const selectIsChatRoomActive = (state: RootState) =>
  state.chatbox.isChatRoomActive
export const selectUnreadMessages = (state: RootState) =>
  state.chatbox.unreadConversationsCount

export const {
  toggleChat,
  toggleChatOpen,
  toggleChatClose,
  onScreenUpdate,
  onBackArrowClick,
  setCurrentChat,
  updateCurrentChatMessages,
  setChatText,
  setUnreadChatsCount,
  setChatRoomActive,
} = chatSlice.actions
export default chatSlice.reducer
