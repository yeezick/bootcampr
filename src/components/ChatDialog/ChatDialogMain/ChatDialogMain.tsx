import { IoMdClose } from 'react-icons/io'
import { onScreenUpdate, selectChatUI } from 'utils/redux/slices/chatSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { ChatScreen } from 'utils/data/chatConstants'
import { ChatPageHeader, ChatMainPageHeader } from './ChatHeader'
import { ChatsList } from '../ChatsList/ChatsList'
import { ChatRoom } from '../ChatRoom/ChatRoom'
import { NewChatRoom } from '../NewChatRoom/NewChatRoom'
import { EditChatRoom } from '../EditChatRoom/EditChatRoom'
import './ChatDialogMain.scss'
import { closeChatBox } from 'utils/helpers/chatHelpers'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const { chatScreen } = useAppSelector(selectChatUI)

  const changeScreen = (screen: ChatScreen) => {
    dispatch(onScreenUpdate(screen))
  }

  const handleConversationClick = () => {
    changeScreen(ChatScreen.ChatRoom)
  }

  const handleCloseChat = () => {
    closeChatBox(dispatch)
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
        <IoMdClose size={22} onClick={handleCloseChat} className='close-btn' />
      </header>
      <section className='chat-page'>
        {chatComponentLookup[chatScreen] || null}
      </section>
    </div>
  )
}
