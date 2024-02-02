import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  current,
} from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import {
  ChatMessageInterface,
  ChatSliceInterface,
  ChatInterface,
  FetchMessagesPayload,
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
  threads: {},
  selectedChatUsers: [],
  isChatRoomActive: false,
  unreadConversationsCount: 0,
  chatText: '',
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
      state.isChatRoomActive = false
      state.ui.chatScreen = ChatScreen.Main
      state.ui.chatScreenPath = [ChatScreen.Main]
    },
    onScreenUpdate: (state, action: PayloadAction<ChatScreen>) => {
      state.isChatRoomActive = action.payload === 'chatroom' ? true : false
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
    setCurrentChat: (state, action: PayloadAction<ChatInterface>) => {
      const chatRoom = action.payload
      state.chat = { ...chatRoom }
      state.threads[chatRoom._id] = {
        ...state.threads[chatRoom._id],
        ...chatRoom,
      }
    },
    updateCurrentChat: (state, action: PayloadAction<ChatInterface>) => {
      const updatedChat = action.payload
      state.chat = { ...updatedChat }
    },

    updateCurrentChatMessages: (state, action) => {
      const { receivedMessage, activeUserId } = action.payload
      const { chatRoomId, senderId } = receivedMessage

      const thread = state.threads[chatRoomId]
      if (thread) {
        const senderParticipant = state.threads[chatRoomId].participants.find(
          pp => pp.participant._id === senderId
        )
        if (!senderParticipant) {
          return
        }
        const newMessage: ChatMessageInterface = {
          sender: senderParticipant.participant,
          text: receivedMessage.newMessage,
          timestamp: new Date().toISOString(),
          status: 'sent',
        }
        state.threads[chatRoomId].lastMessage = newMessage
        if (state.chat._id === receivedMessage.chatRoomId) {
          state.chat.messages = [...state.chat.messages, newMessage]
          state.chat.lastMessage = newMessage
        }
        state.threads[chatRoomId].participants.forEach(participant => {
          if (
            participant.participant._id !== newMessage.sender._id &&
            !state.isChatRoomActive
          ) {
            participant.hasUnreadMessage = true
          } else {
            participant.hasUnreadMessage = false
          }
        })
      }
    },

    setChatText: (state, action: PayloadAction<string>) => {
      state.chatText = action.payload
    },
    setUnreadChatsCount: (state, action: PayloadAction<number>) => {
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

        if (state.threads[chatId]) {
          state.threads[chatId].messages = messages
        }
        //To update the messages of the currently active chat
        if (state.chat && state.chat._id === chatId) {
          state.chat.messages = messages
        }
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        const threadsArray = action.payload
        state.threads = threadsArray.reduce((threadObj, thread) => {
          threadObj[thread._id] = thread
          return threadObj
        }, {})
      })
  },
})

export const selectChatUI = (state: RootState) => state.chatbox.ui
export const selectChat = (state: RootState) => state.chatbox.chat
export const selectIsChatRoomActive = (state: RootState) =>
  state.chatbox.isChatRoomActive
export const selectUnreadMessages = (state: RootState) =>
  state.chatbox.unreadConversationsCount

const threadsObjectSelector = (state: RootState) => state.chatbox.threads
//memoized selector to transform the threads object into an array
const selectThreads = createSelector(threadsObjectSelector, threadsObject =>
  Object.values(threadsObject)
)
export const selectSortedThreads = createSelector([selectThreads], threads => {
  return [...threads].sort((a, b) => {
    // Default dates for threads without a lastMessage
    const defaultDate = new Date(0)

    // Get the timestamp or use the default date
    const dateA = a.lastMessage
      ? dayjs(a.lastMessage.timestamp)
      : dayjs(defaultDate)
    const dateB = b.lastMessage
      ? dayjs(b.lastMessage.timestamp)
      : dayjs(defaultDate)

    return dateB.valueOf() - dateA.valueOf()
  })
})
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
  updateCurrentChat,
} = chatSlice.actions
export default chatSlice.reducer
