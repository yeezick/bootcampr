import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiArrowLeft } from 'react-icons/fi'
import { Conversations } from 'components/ChatDialog/Conversations/Conversations'
import {
  selectConversation,
  toggleChatClose,
} from 'utils/redux/slices/userSlice'
import { Messages } from 'components/ChatDialog/Messages/Messages'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { NewChatRoom } from 'components/ChatDialog/NewChatRoom/NewChatRoom'
import { EditChatRoom } from 'components/ChatDialog/EditChatRoom/EditChatRoom'
import './ChatDialogMain.scss'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const [chatScreen, setChatScreen] = useState<string>('main')
  const currentConversation = useAppSelector(selectConversation)

  const handleConversationClick = () => {
    setChatScreen('messages')
  }

  const handleBackArrow = () => {
    chatScreen === 'editChatRoom'
      ? setChatScreen('messages')
      : setChatScreen('main')
  }

  const handleComposeMessage = () => {
    setChatScreen('composeNewChat')
  }

  const closeChatBox = () => {
    dispatch(toggleChatClose())
  }

  return (
    <div className='chat-dialog-container'>
      <section
        className={
          chatScreen === 'messages'
            ? 'chat-header-messages'
            : 'chat-header-main'
        }
      >
        <ChatTitle
          chatScreen={chatScreen}
          handleBackArrow={handleBackArrow}
          setChatScreen={setChatScreen}
          currentConversation={currentConversation}
        />
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

const ChatTitle = ({
  chatScreen,
  handleBackArrow,
  setChatScreen,
  currentConversation,
}) => {
  if (chatScreen === 'main') {
    return <h1> Chats</h1>
  }

  if (chatScreen === 'composeNewChat') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h5>New Chat Room</h5>
      </div>
    )
  }

  if (chatScreen === 'editChatRoom') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h5>Edit Chat Room</h5>
      </div>
    )
  }

  if (chatScreen === 'messages') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        {currentConversation.isGroup ? (
          <h5
            onClick={() => setChatScreen('editChatRoom')}
            className='group-link'
          >
            {currentConversation.displayName.length > 28
              ? `${currentConversation.displayName.slice(0, 28)}...`
              : currentConversation.displayName || 'Group Chat'}
          </h5>
        ) : (
          <h5>{currentConversation.displayName}</h5>
        )}
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

  if (chatScreen === 'editChatRoom') {
    return <EditChatRoom />
  }
}
