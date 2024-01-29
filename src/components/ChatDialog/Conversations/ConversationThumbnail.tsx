import { RxDotFilled } from 'react-icons/rx'
import { formatLastMessageTimestamp } from 'utils/functions/chatLogic'
import { AvatarGrid } from 'components/ChatDialog/AvatarGrid/AvatarGrid'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
export const ConversationThumbnail = ({
  authUser,
  groupName,
  participants,
  lastMessage,
  lastActive,
  messageIsUnread,
}) => {
  const thumbnailTextClass =
    lastMessage && messageIsUnread ? 'unread-message' : ''
  const thumbnailUnreadDotClass = messageIsUnread
    ? 'unread-dot-visible'
    : 'unread-dot-hidden'

  if (participants.length > 2) {
    const pictures = extractConversationAvatars(participants, authUser._id)

    return (
      <>
        <div className='avatar-grid'>
          <AvatarGrid
            pictures={pictures}
            avatarSize={'medium'}
            chatType={'group'}
          />
        </div>
        <div className='thumbnail-right'>
          <div className='thread-details-grid'>
            <h5 className={thumbnailTextClass}>{groupName || 'Group Chat'}</h5>
            <LastMessageText
              lastMessage={lastMessage}
              authUser={authUser}
              messageIsUnread={messageIsUnread}
            />
          </div>
          <div className='dot-grid'>
            {lastMessage ? (
              <>
                <p>{formatLastMessageTimestamp(lastMessage.timestamp)}</p>
                <RxDotFilled size={26} className={thumbnailUnreadDotClass} />
              </>
            ) : (
              <>
                <p>{formatLastMessageTimestamp(lastActive)}</p>
                <RxDotFilled size={26} className='unread-dot-hidden' />
              </>
            )}
          </div>
        </div>
      </>
    )
  }

  if (participants.length === 2) {
    const recipient = participants.filter(
      participant => participant._id !== authUser._id
    )
    return (
      <>
        <AvatarGrid
          pictures={recipient[0].profilePicture}
          avatarSize={'medium'}
          chatType={'private'}
        />
        <div className='thumbnail-right'>
          <div className='thread-details-grid'>
            <h5 className={thumbnailTextClass}>
              {recipient[0].firstName} {recipient[0].lastName}
            </h5>
            <LastMessageText
              lastMessage={lastMessage}
              authUser={authUser}
              messageIsUnread={messageIsUnread}
            />
          </div>
          <div className='dot-grid'>
            {lastMessage ? (
              <>
                <p>{formatLastMessageTimestamp(lastMessage.timestamp)}</p>
                <RxDotFilled size={26} className={thumbnailUnreadDotClass} />
              </>
            ) : (
              <>
                <p>{formatLastMessageTimestamp(lastActive)}</p>
                <RxDotFilled size={26} className='unread-dot-hidden' />
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

const LastMessageText = ({ lastMessage, authUser, messageIsUnread }) => {
  if (lastMessage) {
    return (
      <p className={messageIsUnread ? 'unread-message' : ''}>
        {lastMessage.sender._id === authUser._id
          ? 'You'
          : lastMessage.sender.firstName}
        : {lastMessage.text || 'Media message'}
      </p>
    )
  } else {
    return <p>No messages...</p>
  }
}
