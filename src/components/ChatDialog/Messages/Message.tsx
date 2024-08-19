import { useAppSelector } from 'utils/redux/hooks'
import {
  isFirstMessageBySameUser,
  getMessageClassNames,
} from 'utils/functions/chatLogic'
import { formatTimestamp } from 'utils/helpers/dateFormatHelpers'
import adminAvatar from '../../../assets/collabifyAdmin.svg'
import { selectChat } from 'utils/redux/slices/chatSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import './Messages.scss'

export const Message = ({
  message,
  index,
  messages,
  selectedMessages,
  handleTimestampClick,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectChat)
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
  const isBotMessage = message.isBotMessage

  return (
    <div className='recipient-avatar'>
      {isBotMessage ? (
        <img src={adminAvatar} alt='avatar' />
      ) : (
        <TeamAvatar size='x-small' userId={message.sender._id} />
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
