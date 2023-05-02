import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiArrowLeft } from 'react-icons/fi'
import { Conversations } from 'components/ChatDialog/Conversations/Conversations'
import { toggleChatClose } from 'utils/redux/slices/userSlice'
import { Messages } from 'components/ChatDialog/Messages/Messages'
import { useState } from 'react'
import { useAppDispatch } from 'utils/redux/hooks'
import { NewChatRoom } from 'components/ChatDialog/NewChatRoom/NewChatRoom'
import './ChatDialogMain.scss'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const [chatScreen, setChatScreen] = useState<string>('main')

  const handleConversationClick = () => {
    setChatScreen('messages')
  }

  const handleBackArrow = () => {
    setChatScreen('main')
  }

  const handleComposeMessage = () => {
    setChatScreen('composeNewChat')
  }

  const closeChatBox = () => {
    dispatch(toggleChatClose())
  }

  return (
    <div className='chat-dialog-container'>
      <section className='chat-header'>
        <ChatTitle chatScreen={chatScreen} handleBackArrow={handleBackArrow} />
        <ChatHeaderActions
          chatScreen={chatScreen}
          handleComposeMessage={handleComposeMessage}
          closeChatBox={closeChatBox}
        />
      </section>
      <section className='chat-body'>
        <ChatBody
          chatScreen={chatScreen}
          handleConversationClick={handleConversationClick}
        />
      </section>
    </div>
  )
}

const ChatTitle = ({ chatScreen, handleBackArrow }) => {
  if (chatScreen === 'main') {
    return (
      <div className='chat-header'>
        <h1> Chats</h1>
      </div>
    )
  }

  if (chatScreen === 'composeNewChat') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h1>New Chat Room</h1>
      </div>
    )
  }

  if (chatScreen) {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h1>Messages</h1>
      </div>
    )
  }
}

const ChatHeaderActions = ({
  chatScreen,
  handleComposeMessage,
  closeChatBox,
}) => {
  if (chatScreen === 'main') {
    return (
      <div className='main-icons'>
        <HiOutlinePencilAlt size={22} onClick={handleComposeMessage} />
        <IoMdClose size={22} onClick={closeChatBox} />
      </div>
    )
  } else
    return (
      <div className='main-icons'>
        <IoMdClose size={22} onClick={closeChatBox} />
      </div>
    )
}

const ChatBody = ({ chatScreen, handleConversationClick }) => {
  if (chatScreen === 'main') {
    return <Conversations handleConversationClick={handleConversationClick} />
  }

  if (chatScreen === 'messages') {
    return <Messages />
  }

  if (chatScreen === 'composeNewChat') {
    return <NewChatRoom />
  }
}
