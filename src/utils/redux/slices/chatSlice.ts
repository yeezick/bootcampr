import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  current,
} from '@reduxjs/toolkit'
import { blankDayJs, generateDayJs } from 'utils/helpers'
import {
  ChatMessageInterface,
  ChatSliceInterface,
  ChatInterface,
  FetchMessagesPayload,
} from 'interfaces/ChatInterface'
import { getChatMessagesByType, getUserChatThreads } from 'utils/api/chat'
import { ChatScreen } from 'utils/data/chatConstants'
import { RootState } from 'utils/redux/store'
import { selectUserId } from './userSlice'
import { selectMembersAsTeam } from './projectSlice'
import {
  mapMessageSender,
  mapParticipantsWithMemberDetails,
} from 'utils/functions/chatLogic'

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
    isTeamChat: false,
  },
  threads: {},
  selectedChatUsers: [],
  activeChatRoomId: null,
  chatText: '',
}

export const fetchMessages = createAsyncThunk<
  FetchMessagesPayload,
  { chatId: string; chatType: 'group' | 'private' },
  { state: RootState }
>(
  'chatbox/fetchMessages',
  async ({ chatId, chatType }, { getState, rejectWithValue }) => {
    try {
      const messages = await getChatMessagesByType(chatId, chatType)
      const members = selectMembersAsTeam(getState())
      const mappedMessages = messages.map(message => {
        return mapMessageSender(message, members)
      })
      return { chatId, messages: mappedMessages }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchThreads = createAsyncThunk<
  ChatInterface[],
  undefined,
  { state: RootState }
>('chatbox/fetchThreads', async (_, thunkAPI) => {
  try {
    const threads = await getUserChatThreads()
    const members = selectMembersAsTeam(thunkAPI.getState())
    const threadsMap = threads.map((thread: ChatInterface) => {
      const lastMessageMap = mapMessageSender(thread.lastMessage, members)
      const participantsMap = mapParticipantsWithMemberDetails(thread, members)
      return {
        ...thread,
        participants: participantsMap,
        lastMessage: lastMessageMap,
      }
    })
    return threadsMap
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

//map participants and get details
export const processChatRoom = createAsyncThunk<
  ChatInterface,
  ChatInterface,
  { state: RootState }
>(
  'chatbox/createAndSetNewChatRoom',
  async (chatRoom, { getState, dispatch }) => {
    const members = selectMembersAsTeam(getState())
    const mappedParticipants = mapParticipantsWithMemberDetails(
      chatRoom,
      members
    )
    const lastMessageMap = mapMessageSender(chatRoom.lastMessage, members)
    const mappedMessages = chatRoom.messages.map(message => {
      return mapMessageSender(message, members)
    })
    return {
      ...chatRoom,
      participants: mappedParticipants,
      lastMessage: lastMessageMap,
      messages: mappedMessages,
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
      state.activeChatRoomId = null
      state.ui.chatScreen = ChatScreen.Main
      state.ui.chatScreenPath = [ChatScreen.Main]
      state.chat = initialState.chat
    },
    onScreenUpdate: (state, action: PayloadAction<ChatScreen>) => {
      const latestPage =
        state.ui.chatScreenPath[state.ui.chatScreenPath.length - 1]
      if (latestPage !== action.payload) {
        state.ui.chatScreenPath = [...state.ui.chatScreenPath, action.payload]
      }
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
    },
    updateCurrentChat: (state, action: PayloadAction<ChatInterface>) => {
      const chatRoom = action.payload
      state.chat = { ...chatRoom }
      state.threads[chatRoom._id] = chatRoom
    },
    resetCurrentChat: (state, action: PayloadAction<ChatInterface>) => {
      state.chat = initialState.chat
    },
    updateCurrentChatMessages: (state, action) => {
      const { receivedMessage } = action.payload
      const { chatRoomId, senderId } = receivedMessage
      const thread = state.threads[chatRoomId]
      if (thread) {
        const senderParticipant = state.threads[chatRoomId].participants.find(
          pp => pp.userInfo._id === senderId
        )
        console.log(current(senderParticipant))
        const newMessage: ChatMessageInterface = {
          sender: senderParticipant.userInfo,
          text: receivedMessage.newMessage,
          timestamp: blankDayJs().toISOString(),
          status: 'sent',
        }

        state.threads[chatRoomId].lastMessage = newMessage
        if (state.activeChatRoomId === receivedMessage.chatRoomId) {
          state.chat.messages = [...state.chat.messages, newMessage]
          state.chat.lastMessage = newMessage
        }
      }
    },
    setMessageUnread: (state, action) => {
      const { chatRoomId, senderId } = action.payload
      const thread = state.threads[chatRoomId]
      if (thread) {
        console.log('here')
        thread.participants.forEach(participant => {
          if (
            participant.userInfo._id !== senderId &&
            state.activeChatRoomId !== chatRoomId
          ) {
            console.log('there')
            participant.hasUnreadMessage = true
          }
        })
      }
    },
    setMessageRead: (state, action) => {
      const { chatRoomId, activeUserId } = action.payload
      const thread = state.threads[chatRoomId]
      if (thread) {
        thread.participants.forEach(participant => {
          if (
            participant.userInfo._id === activeUserId &&
            state.activeChatRoomId === chatRoomId
          ) {
            participant.hasUnreadMessage = false
          }
        })
      }
    },
    setChatText: (state, action: PayloadAction<string>) => {
      state.chatText = action.payload
    },
    setActiveChatRoomId: (state, action: PayloadAction<string>) => {
      state.activeChatRoomId = action.payload
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
        if (state.chat && state.activeChatRoomId === chatId) {
          state.chat.messages = messages
        }
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        const threads = action.payload
        state.threads = threads.reduce((threadObj, thread) => {
          threadObj[thread._id] = thread
          return threadObj
        }, {})
      })
      .addCase(processChatRoom.fulfilled, (state, action) => {
        const chatRoom = action.payload
        state.threads[chatRoom._id] = chatRoom
      })
  },
})

export const selectChatUI = (state: RootState) => state.chatbox.ui
export const selectChat = (state: RootState) => state.chatbox.chat
export const selectActiveChatRoomId = (state: RootState) =>
  state.chatbox.activeChatRoomId
const threadsObjectSelector = (state: RootState) => state.chatbox.threads
//memoized selector to transform the threads object into an array
const selectThreads = createSelector(threadsObjectSelector, threadsObject =>
  Object.values(threadsObject)
)
export const selectSortedThreads = createSelector(
  selectThreads,
  (threads: ChatInterface[]) => {
    const copyThreads = [...threads]
    return copyThreads.sort((a, b) => {
      // Default dates for threads without a lastMessage, default date is Jan 01 2000
      const defaultDate = generateDayJs('0')
      const dateA = a.lastMessage
        ? generateDayJs(a.lastMessage.timestamp).toDate()
        : defaultDate.toDate()
      const dateB = b.lastMessage
        ? generateDayJs(b.lastMessage.timestamp).toDate()
        : defaultDate.toDate()
      return dateB.valueOf() - dateA.valueOf()
    })
  }
)
export const selectTeamChat = createSelector(selectThreads, threads => {
  const teamChat = threads.find(thread => thread.isTeamChat)
  return teamChat
})
export const selectUnreadMessageCount = createSelector(
  [selectThreads, selectUserId],
  (threads: ChatInterface[], userId: string) => {
    return threads.reduce((count, thread) => {
      const hasUnread = thread.participants.some(
        participant =>
          participant.userInfo._id === userId && participant.hasUnreadMessage
      )
      return count + (hasUnread ? 1 : 0)
    }, 0)
  }
)

export const {
  toggleChat,
  toggleChatOpen,
  toggleChatClose,
  onScreenUpdate,
  onBackArrowClick,
  setCurrentChat,
  updateCurrentChatMessages,
  setChatText,
  setActiveChatRoomId,
  setMessageRead,
  updateCurrentChat,
  setMessageUnread,
  resetCurrentChat,
} = chatSlice.actions
export default chatSlice.reducer
