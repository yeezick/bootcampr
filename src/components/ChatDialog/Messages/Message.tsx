import {
  formatTimestamp,
  isFirstMessageBySameUser,
  getMessageClassNames,
} from 'utils/functions/chatLogic'
import './Messages.scss'

export const Message = ({
  message,
  index,
  messages,
  authUser,
  selectedMessages,
  handleTimestampClick,
  currentConversation,
}) => {
  const isSenderAuthUser = message.sender._id === authUser._id
  const showSenderName =
    currentConversation.chatType === 'group' &&
    isFirstMessageBySameUser(messages, index) &&
    !isSenderAuthUser
  const {
    isSameUser,
    isOnlyMessage,
    isAvatarDisplayed,
    isFirstMessage,
    isLastMessage,
    timestampClasses,
    isLastMessageAndSameRecipient,
  } = getMessageClassNames(messages, message, index, authUser)

  return (
    <div className='message-container'>
      {showSenderName && (
        <span className='message-sender-name'>
          {message.sender.firstName} {message.sender.lastName}
        </span>
      )}
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
          //   isMessageSelected={isMessageSelected}
          handleTimestampClick={handleTimestampClick}
        />
      </div>
      <TimestampDisplay
        timestampClasses={timestampClasses}
        message={message.text}
        selectedMessages={selectedMessages}
      />
    </div>
  )
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
  //   isMessageSelected,
  handleTimestampClick,
}) => {
  const defineDynamicClassNames = () => {
    return `${
      isSenderAuthUser ? 'auth-text' : 'recipient-text'
    } ${isSameUser} ${isAvatarDisplayed} ${isLastMessage} ${isFirstMessage} ${isOnlyMessage} `
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
