import './ChatDialogMain.scss'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiArrowLeft } from 'react-icons/fi'
import { Conversations } from '../Conversations/Conversations'
import { toggleChatClose } from 'utilities/redux/slices/userSlice'
import { Messages } from '../Messages/Messages'
import { useState } from 'react'
import { useAppDispatch } from '../../../utilities/redux/hooks'
import { NewChatRoom } from '../NewChatRoom/NewChatRoom'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const [showMessages, toggleShowMessages] = useState(false)
  const [showChats, toggleShowChats] = useState(true)
  // const [chatHeader, setChatHeader] = useState('')
  const [showNewChat, toggleShowNewChat] = useState(false)

  const handleConversationClick = () => {
    toggleShowChats(false)
    toggleShowMessages(true)
    // setChatHeader('Messages')
  }

  const handleBackArrow = () => {
    toggleShowChats(true)
    toggleShowMessages(false)
    toggleShowNewChat(false)
  }

  const handleComposeMessage = () => {
    toggleShowChats(false)
    toggleShowNewChat(true)
  }

  const closeChatBox = () => {
    dispatch(toggleChatClose())
  }

  return (
    <div className='chat-dialog-container'>
      <section className='chat-header'>
        {!showMessages && !showNewChat ? (
          <h1>Chats</h1>
        ) : (
          <div className='back-arrow'>
            <FiArrowLeft size={23} onClick={() => handleBackArrow()} />
            {!showMessages ? <h1>New Chat Room</h1> : <h1>Messages</h1>}
          </div>
        )}
        <div>
          {!showMessages && showChats ? (
            <HiOutlinePencilAlt
              size={22}
              onClick={() => handleComposeMessage()}
            />
          ) : (
            ''
          )}
          <IoMdClose size={22} onClick={() => closeChatBox()} />
        </div>
      </section>
      {showNewChat ? (
        <NewChatRoom />
      ) : (
        <>
          {!showMessages && showChats ? (
            <Conversations handleConversationClick={handleConversationClick} />
          ) : (
            <Messages />
          )}
        </>
      )}
    </div>
  )
}
