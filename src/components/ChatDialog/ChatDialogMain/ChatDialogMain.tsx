import { IoMdClose } from 'react-icons/io'
import {
  onScreenUpdate,
  selectChatUI,
  setChatRoomActive,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { ChatScreen } from 'utils/data/chatConstants'
import { ChatPageHeader, ChatMainPageHeader } from './ChatHeader'
import { ChatsList } from '../ChatsList/ChatsList'
import { ChatRoom } from '../ChatRoom/ChatRoom'
import { NewChatRoom } from '../NewChatRoom/NewChatRoom'
import { EditChatRoom } from '../EditChatRoom/EditChatRoom'
import './ChatDialogMain.scss'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const { chatScreen } = useAppSelector(selectChatUI)

  const changeScreen = (screen: ChatScreen) => {
    dispatch(onScreenUpdate(screen))
  }
  const handleConversationClick = () => {
    changeScreen(ChatScreen.ChatRoom)
  }

  const closeChatBox = () => {
    dispatch(setChatRoomActive(false))
    dispatch(toggleChatClose())
  }

  const chatComponentLookup = {
    [ChatScreen.Main]: (
      <ChatsList handleConversationClick={handleConversationClick} />
    ),
    [ChatScreen.ChatRoom]: <ChatRoom />,
    [ChatScreen.ComposeNewChat]: <NewChatRoom chatScreen={chatScreen} />,
    [ChatScreen.InviteNewMembers]: <NewChatRoom chatScreen={chatScreen} />,
    [ChatScreen.EditChatRoom]: <EditChatRoom />,
  }

  return (
    <div className='chat-dialog-container'>
      <header className='chat-header'>
        {chatScreen === ChatScreen.Main ? (
          <ChatMainPageHeader />
        ) : (
          <ChatPageHeader />
        )}
        <IoMdClose size={22} onClick={closeChatBox} className='close-btn' />
      </header>
      <section className='chat-page'>
        {chatComponentLookup[chatScreen] || null}
      </section>
    </div>
  )
}
