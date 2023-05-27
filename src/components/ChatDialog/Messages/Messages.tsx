import { useEffect, useState } from 'react'
import { BsPaperclip } from 'react-icons/bs'
import { getAllGroupMessages, getAllPrivateMessages } from 'utils/api/chat'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  selectConversation,
} from 'utils/redux/slices/userSlice'
import { formatTimestamp } from 'utils/functions/utilityFunctions'
import './Messages.scss'

export const Messages = () => {
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const [messages, setMessages] = useState([])
  const [showTimestamp, toggleShowTimestamp] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const messages = currentConversation.isGroup
          ? await getAllGroupMessages(authUser._id, currentConversation._id)
          : await getAllPrivateMessages(authUser._id, currentConversation._id)
        setMessages(messages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    getAllMessages()
  }, [authUser._id, currentConversation._id, currentConversation.isGroup])

  const handleTimestampClick = (message: any) => {
    !showTimestamp ? toggleShowTimestamp(true) : toggleShowTimestamp(false)
    setSelectedMessage(message)
  }

  return (
    <div className='messages-container'>
      <section className='messages-grid'>
        {messages.map(message => {
          const isSender = message.sender._id === authUser._id
          const messageClasses = isSender ? 'message-right' : 'message-left'
          const detailsClasses = isSender ? 'details-right' : 'details-left'

          return (
            <div
              key={message.timestamp}
              className={`message-container ${
                selectedMessage === message ? 'selected' : ''
              }`}
              onClick={() => handleTimestampClick(message)}
            >
              <MessageDisplay
                isSender={isSender}
                messageClasses={messageClasses}
                detailsClasses={detailsClasses}
                message={message}
                showTimestamp={showTimestamp}
                selectedMessage={selectedMessage}
              />
            </div>
          )
        })}
      </section>
      <div className='convo-input-container'>
        <BsPaperclip size={23} />
        <input className='convo-input' />
      </div>
    </div>
  )
}

const MessageDisplay = ({
  isSender,
  messageClasses,
  detailsClasses,
  message,
  showTimestamp,
  selectedMessage,
}) => {
  if (!isSender) {
    return (
      <div className='recipient-grid'>
        <div className='recipient-avatar'>
          <img src={message.sender.profilePicture} alt='avatar' />
        </div>
        <div className={`message ${messageClasses}`}>
          <div className='message-text'>
            <p>{message.text}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isSender) {
    return (
      <>
        <div className={`message ${messageClasses}`}>
          <div className='message-text'>
            <p>{message.text}</p>
          </div>
        </div>
        {showTimestamp && selectedMessage === message && (
          <div className={`message-details ${detailsClasses}`}>
            <div className='message-timestamp'>
              <p>
                <span style={{ fontWeight: '800' }}>{message.status}</span> -{' '}
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        )}
      </>
    )
  }
}
