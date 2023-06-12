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
import { selectAuthUser } from '../../../utils/redux/slices/userSlice'
import { selectConversation } from 'utils/redux/slices/chatSlice'
import { formatTimestamp } from 'utils/functions/chatLogic'
import { DefaultIcons, emptyChatText } from 'utils/data/chatConstants'
import { ChatMessageInterface } from 'interfaces/ChatInterface'
import {
  isFirstMessageBySameUser,
  isLastMessageBySameRecipient,
  isLastMessageBySameUser,
  isMessageSameSender,
  isOnlyMessageBySameSender,
  isRecipientMessageSameSender,
  isSameSenderAsPrevious,
} from 'utils/functions/chatLogic'
import './Messages.scss'

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let messageRes
        if (currentConversation.isGroup) {
          messageRes = await getAllGroupMessages(
            authUser._id,
            currentConversation._id
          )
        } else {
          messageRes = await getAllPrivateMessages(
            authUser._id,
            currentConversation._id
          )
          setChatParticipants(messageRes.participants)
        }

        setMessages(messageRes.combinedMessages)

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
    fetchMessages()
  }, [
    authUser._id,
    currentConversation._id,
    currentConversation.isGroup,
    newMessage,
  ])

  useEffect(() => {
    // Scroll messages container to bottom for last message when component mounts
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Extracting recipient's ID in private chat
    if (chatParticipants) {
      const recipientId = chatParticipants.filter(
        memberId => memberId != authUser._id
      )
      setChatRecipientId(recipientId)
    }
  }, [chatParticipants])

  const handleTimestampClick = (message: any) => {
    // Logic to display/hide timestamp on message click:
    // Check if selected message is already present in selectedMessages array
    if (selectedMessages.some(msg => msg === message)) {
      // If it exists, remove it from the array
      setSelectedMessages(selectedMessages.filter(msg => msg !== message))
    } else {
      // If it doesn't exist, add it to the array
      setSelectedMessages([...selectedMessages, message])
    }
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTextForm({ ...textForm, [name]: value })
  }

  const handleSubmitText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (textForm.text === '') return // Message will not send if textarea is empty

    if (currentConversation.isGroup) {
      await createGroupMessage(
        authUser._id,
        currentConversation._id,
        textForm.text
      )
    } else {
      await createPrivateMessage(
        authUser._id,
        currentConversation._id,
        textForm.text
      )
    }
    setTextForm(emptyChatText)
    setNewMessage(true)
  }

  const handleKeyDown = e => {
    // Send message with 'Enter' key
    // Does not send with 'Enter' + 'Shift'
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmitText(e)
    }
  }

  return (
    <div className='messages-container'>
      <section className='messages-grid' ref={containerRef}>
        <MessagesList
          authUser={authUser}
          listResults={listResults}
          messages={messages}
          selectedMessages={selectedMessages}
          handleTimestampClick={handleTimestampClick}
        />
      </section>
      <TextInput
        textForm={textForm}
        handleChangeText={handleChangeText}
        handleKeyDown={handleKeyDown}
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
}) => {
  if (listResults === 'messages') {
    return messages.map((message, index) => {
      // Check if message is by same recipient user and/or by authUser:
      const isSenderAuthUser = message.sender._id === authUser._id
      const isSameUser = isSameSenderAsPrevious(messages, message, index)
        ? 'same-user-text-margin'
        : 'other-user-text-margin'
      // Check message position if consecutive messages are sent by same user:
      const isLastMessageAndSameRecipient =
        isRecipientMessageSameSender(messages, message, index, authUser._id) ||
        isLastMessageBySameRecipient(messages, index, authUser._id)
      const isLastMessage =
        (isMessageSameSender(messages, message, index) ||
          isLastMessageBySameUser(messages, index)) &&
        'same-sender-last-message'
      const isFirstMessage =
        (isMessageSameSender(messages, message, index) ||
          isFirstMessageBySameUser(messages, index)) &&
        'same-sender-first-message'
      const isOnlyMessage =
        isOnlyMessageBySameSender(messages, index) && 'same-sender-one-message'
      const isAvatarDisplayed = isLastMessageAndSameRecipient
        ? 'avatar'
        : 'no-avatar'
      // ClassName logic for displaying message timestamps on click:
      const isMessageSelected = selectedMessages.includes(message)
        ? 'selected-message'
        : 'not-selected'
      const timestampClasses = isSenderAuthUser
        ? 'details-right'
        : 'details-left'

      return (
        <div key={message._id} className='message-container'>
          <div className='message-grid'>
            {isLastMessageAndSameRecipient && (
              <RecipientsAvatar message={message} />
            )}
            <MessageText
              isSenderAuthUser={isSenderAuthUser}
              message={message}
              isSameUser={isSameUser}
              isAvatarDisplayed={isAvatarDisplayed}
              isLastMessage={isLastMessage}
              isFirstMessage={isFirstMessage}
              isOnlyMessage={isOnlyMessage}
              isMessageSelected={isMessageSelected}
              handleTimestampClick={handleTimestampClick}
            />
          </div>
          <TimestampDisplay
            timestampClasses={timestampClasses}
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
        <img src={DefaultIcons.NoMessages} alt='no data' />
        <p>Don't be shy! Start a conversation</p>
      </div>
    )
  }
}

const RecipientsAvatar = ({ message }) => {
  return (
    <div className='recipient-avatar'>
      <img src={message.sender.profilePicture} alt='avatar' />
    </div>
  )
}

const MessageText = ({
  isSenderAuthUser,
  message,
  isSameUser,
  isAvatarDisplayed,
  isLastMessage,
  isFirstMessage,
  isOnlyMessage,
  isMessageSelected,
  handleTimestampClick,
}) => {
  const defineDynamicClassNames = () => {
    return `${
      isSenderAuthUser ? 'auth-text' : 'recipient-text'
    } ${isSameUser} ${isAvatarDisplayed} ${isLastMessage} ${isFirstMessage} ${isOnlyMessage} ${isMessageSelected}`
  }
  return (
    <div
      className={defineDynamicClassNames()}
      onClick={() => handleTimestampClick(message)}
    >
      <p>{message.text}</p>
    </div>
  )
}

const TimestampDisplay = ({ timestampClasses, message, selectedMessages }) => {
  return (
    <>
      {selectedMessages.includes(message) && message.timestamp && (
        <div className={`message-details ${timestampClasses}`}>
          <div className='message-timestamp'>
            <p>{formatTimestamp(message.timestamp)}</p>
          </div>
        </div>
      )}
    </>
  )
}

const TextInput = ({
  textForm,
  handleChangeText,
  handleKeyDown,
  handleSubmitText,
}) => {
  return (
    <div className='convo-input-container'>
      <BsPaperclip size={23} />
      <textarea
        className='convo-input'
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        name='text'
        value={textForm.text}
        placeholder='Type your message here...'
      />
      {textForm.text !== '' && (
        <AiOutlineSend
          size={20}
          className='send-button'
          onClick={handleSubmitText}
        />
      )}
    </div>
  )
}
