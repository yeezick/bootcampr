import { ChatScreen } from 'utils/data/chatConstants'
import {
  fetchMessages,
  onScreenUpdate,
  setCurrentChat,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'

export const chatRouterHandler = async (
  threads,
  user,
  chatRoomId,
  dispatch,
  navigate
) => {
  const chatRoom = threads.find(thread => thread._id === chatRoomId)
  if (!chatRoom) return

  dispatch(setCurrentChat(chatRoom))
  await dispatch(
    fetchMessages({ chatId: chatRoom._id, chatType: chatRoom.chatType })
  )
  navigate(`/project/${user.project}`, { replace: true })
  dispatch(toggleChatOpen())
  dispatch(onScreenUpdate(ChatScreen.ChatRoom))
}
