import {
  onScreenUpdate,
  setCurrentConversation,
  setSelectedMember,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import {
  createPrivateChatRoom,
  getUserPrivateConversations,
} from 'utils/api/chat'
import { ChatScreen } from 'utils/data/chatConstants'

export const handleMemberMessageClick = async memberData => {
  try {
    const {
      firstName,
      lastName,
      memberId,
      email,
      profilePicture,
      authUser,
      dispatch,
    } = memberData

    const fetchConversations = async () => {
      const conversations = await getUserPrivateConversations(authUser._id)

      const existingChatWithMember = conversations.messageThreads.find(
        conversation =>
          conversation.participants.find(
            participant => participant._id === memberId
          )
      )

      let conversationId: string = ''

      if (existingChatWithMember) {
        conversationId = existingChatWithMember._id
      } else {
        const newRoom = await createPrivateChatRoom(authUser._id, email)
        conversationId = newRoom.chatRoom._id
      }
      dispatch(
        setCurrentConversation({
          _id: conversationId,
          isGroup: false,
          participants: [memberId],
          displayName: `${firstName} ${lastName}`,
        })
      )
      dispatch(
        setSelectedMember({
          _id: memberId,
          firstName,
          lastName,
          profilePicture,
        })
      )
      dispatch(toggleChatOpen())
      dispatch(onScreenUpdate(ChatScreen.Messages))
    }
    fetchConversations()
  } catch (error) {
    console.log('Error fetching conversations', error)
  }
}
