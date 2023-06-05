import { useEffect, useState, useRef } from 'react'
import { BsPaperclip } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import {
  createGroupMessage,
  createPrivateMessage,
  getAllGroupMessages,
  getAllPrivateMessages,
} from 'utils/api/chat'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  selectConversation,
} from 'utils/redux/slices/userSlice'
import { formatTimestamp } from 'utils/functions/utilityFunctions'
import { emptyChatText } from 'utils/data/userConstants'
import './Messages.scss'
import { ChatMessageInterface } from 'interfaces'

export const Messages = ({ setChatRecipientId }) => {
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const [messages, setMessages] = useState([])
  const [chatParticipants, setChatParticipants] = useState([])
  const [listResults, setListResults] = useState('empty')
  const [selectedMessages, setSelectedMessages] = useState([])
  const [textForm, setTextForm] = useState<ChatMessageInterface>(emptyChatText)
  const [newMessage, setNewMessage] = useState(false)
  const containerRef = useRef(null)
  const defaultImg =
    'https://i.postimg.cc/bN6vcwc9/Screen-Shot-2023-04-18-at-10-32-05-PM.png'

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        let messageRes: any
        if (currentConversation.isGroup) {
          messageRes = await getAllGroupMessages(
            authUser._id,
            currentConversation._id
          )
          setMessages(messageRes.combinedMessages)
        } else {
          messageRes = await getAllPrivateMessages(
            authUser._id,
            currentConversation._id
          )
          setMessages(messageRes.combinedMessages)
          setChatParticipants(messageRes.participants)
        }
        if (
          !messageRes.combinedMessages ||
          messageRes.combinedMessages.length === 0 ||
          !messageRes
        ) {
          setListResults('noMessages')
        } else {
          setListResults('messages')
        }
        setNewMessage(false)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    getAllMessages()
  }, [
    authUser._id,
    currentConversation._id,
    currentConversation.isGroup,
    newMessage,
  ])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (chatParticipants) {
      const recipientId = chatParticipants.filter(
        memberId => memberId != authUser._id
      )
      setChatRecipientId(recipientId)
    }
  }, [chatParticipants])

  const handleTimestampClick = (message: any) => {
    if (selectedMessages.some(msg => msg === message)) {
      setSelectedMessages(selectedMessages.filter(msg => msg !== message))
    } else {
      setSelectedMessages([...selectedMessages, message])
    }
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTextForm({ ...textForm, [name]: value })
  }

  const handleSubmitText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentConversation.isGroup) {
      createGroupMessage(authUser._id, currentConversation._id, textForm.text)
      setTextForm(emptyChatText)
    } else {
      createPrivateMessage(authUser._id, currentConversation._id, textForm.text)
      setTextForm(emptyChatText)
    }
    setNewMessage(true)
  }

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmitText(e)
      }
    }

    const textarea = document.querySelector('.convo-input')

    textarea.addEventListener('keydown', handleKeyPress)

    return () => {
      textarea.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleSubmitText])

  return (
    <div className='messages-container'>
      <section className='messages-grid' ref={containerRef}>
        <MessagesList
          authUser={authUser}
          listResults={listResults}
          messages={messages}
          selectedMessages={selectedMessages}
          handleTimestampClick={handleTimestampClick}
          defaultImg={defaultImg}
        />
      </section>
      <TextInput
        textForm={textForm}
        handleChangeText={handleChangeText}
        handleSubmitText={handleSubmitText}
      />
    </div>
  )
}

const MessagesList = ({
  authUser,
  listResults,
  messages,
  selectedMessages,
  handleTimestampClick,
  defaultImg,
}) => {
  if (listResults === 'messages') {
    return messages.map(message => {
      const isSender = message.sender._id === authUser._id
      const messageClasses = isSender ? 'message-right' : 'message-left'
      const detailsClasses = isSender ? 'details-right' : 'details-left'
      const isSelected = selectedMessages.includes(message)

      return (
        <div
          key={message.timestamp}
          className={`message-container ${isSelected ? 'selected' : ''}`}
          onClick={() => handleTimestampClick(message)}
        >
          <MessageDisplay
            isSender={isSender}
            messageClasses={messageClasses}
            detailsClasses={detailsClasses}
            message={message}
            selectedMessages={selectedMessages}
          />
        </div>
      )
    })
  }

  if (listResults === 'noMessages') {
    return (
      <div className='no-results'>
        <img src={defaultImg} alt='no data' />
        <p>Don't be shy! Start a conversation</p>
      </div>
    )
  }
}

const MessageDisplay = ({
  isSender,
  messageClasses,
  detailsClasses,
  message,
  selectedMessages,
}) => {
  if (!isSender) {
    return (
      <>
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
        {selectedMessages.includes(message) && message.timestamp && (
          <div className={`message-details ${detailsClasses}`}>
            <div className='message-timestamp'>
              <p>{formatTimestamp(message.timestamp)}</p>
            </div>
          </div>
        )}
      </>
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
        {selectedMessages.includes(message) && message.timestamp && (
          <div className={`message-details ${detailsClasses}`}>
            <div className='message-timestamp'>
              <p>{formatTimestamp(message.timestamp)}</p>
            </div>
          </div>
        )}
      </>
    )
  }
}

const TextInput = ({ textForm, handleChangeText, handleSubmitText }) => {
  if (textForm.text === '') {
    return (
      <div className='convo-input-container'>
        <BsPaperclip size={23} />
        <textarea
          className='convo-input'
          onChange={handleChangeText}
          name='text'
          value={textForm.text}
          placeholder='Type your message here...'
        />
      </div>
    )
  } else {
    return (
      <div className='convo-input-container'>
        <BsPaperclip size={23} />
        <textarea
          className='convo-input'
          onChange={handleChangeText}
          name='text'
          value={textForm.text}
          placeholder='Type your message here...'
        />
        <AiOutlineSend
          size={20}
          className='send-button'
          onClick={handleSubmitText}
        />
      </div>
    )
  }
}
