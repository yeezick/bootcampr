import { ChatScreen } from 'utils/data/chatConstants'
import {
  fetchMessages,
  onScreenUpdate,
  setCurrentChat,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'

export const chatNotification = async (
  threads,
  user,
  chatRoomId,
  dispatch,
  navigate
) => {
  const chatRoom = threads.find(thread => thread._id === chatRoomId)
  if (!chatRoom) return
  console.log(chatRoom)
  dispatch(setCurrentChat(chatRoom))
  await dispatch(
    fetchMessages({ chatId: chatRoom._id, chatType: chatRoom.chatType })
  )
  //check if need to replace and error message for the navigate
  navigate(`/project/${user.project}`)
  dispatch(toggleChatOpen())
  dispatch(onScreenUpdate(ChatScreen.ChatRoom))
}
