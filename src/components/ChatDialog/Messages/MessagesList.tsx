import {
  isFirstMessageBySameUser,
  isLastMessageBySameRecipient,
  isLastMessageBySameUser,
  isMessageSameSender,
  isOnlyMessageBySameSender,
  isRecipientMessageSameSender,
  isSameSenderAsPrevious,
} from 'utils/functions/chatLogic'
import { formatTimestamp } from 'utils/functions/chatLogic'
import { ChatIcons } from 'utils/data/chatConstants'
import { useAppSelector } from 'utils/redux/hooks'
import { selectConversation } from 'utils/redux/slices/chatSlice'
export const MessagesList = ({
  authUser,
  listResults,
  messages,
  selectedMessages,
  handleTimestampClick,
}) => {
  const currentConversation = useAppSelector(selectConversation)
  //WARNING - TODO - sender first name and last name is hard coded, slice/interface needs to be refactored
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
        <div key={index} className='message-container'>
          {currentConversation.isGroup &&
            isFirstMessageBySameUser(messages, index) &&
            !isSenderAuthUser && (
              <span className='message-sender-name'>John Doe</span>
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
    })
  }

  if (listResults === 'noMessages') {
    return (
      <div className='no-results'>
        <img src={ChatIcons.NoMessages} alt='no data' />
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
  const currentConversation = useAppSelector(selectConversation)
  return (
    <>
      <div
        className={defineDynamicClassNames()}
        onClick={() => handleTimestampClick(message)}
      >
        <p>{message.text}</p>
      </div>
    </>
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
