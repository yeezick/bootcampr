import {
  isFirstMessageBySameUser,
  getMessageClassNames,
} from 'utils/functions/chatLogic'
import { formatTimestamp } from 'utils/helpers/dateFormatHelpers'
import adminAvatar from '../../../assets/Images/bootcamprB.png'
import './Messages.scss'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'

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
    isMessageSelected,
  } = getMessageClassNames(messages, message, index, authUser, selectedMessages)

  return (
    <div className={`message-container ${isSameUser}`}>
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
}

const RecipientsAvatar = ({ message }) => {
  const isBotMessage = true

  return (
    <div className='recipient-avatar'>
      {isBotMessage ? (
        <img src={adminAvatar} alt='avatar' />
      ) : (
        <TeamAvatar userId={message.sender._id} size='small' />
      )}
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
