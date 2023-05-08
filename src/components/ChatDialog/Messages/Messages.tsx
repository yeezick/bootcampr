import { useEffect, useState } from 'react'
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

export const Messages = () => {
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const [messages, setMessages] = useState([])
  const [listResults, setListResults] = useState('empty')
  const [showTimestamp, toggleShowTimestamp] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [textForm, setTextForm] = useState<ChatMessageInterface>(emptyChatText)
  const defaultImg =
    'https://i.postimg.cc/bN6vcwc9/Screen-Shot-2023-04-18-at-10-32-05-PM.png'

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const messages = currentConversation.isGroup
          ? await getAllGroupMessages(authUser._id, currentConversation._id)
          : await getAllPrivateMessages(authUser._id, currentConversation._id)
        setMessages(messages)

        if (!messages) {
          setListResults('noMessages')
        } else {
          setListResults('messages')
        }
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
  }

  return (
    <div className='messages-container'>
      <section className='messages-grid'>
        <MessagesList
          authUser={authUser}
          listResults={listResults}
          messages={messages}
          selectedMessage={selectedMessage}
          handleTimestampClick={handleTimestampClick}
          showTimestamp={showTimestamp}
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
  selectedMessage,
  handleTimestampClick,
  showTimestamp,
  defaultImg,
}) => {
  if (listResults === 'messages') {
    return messages.map(message => {
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
