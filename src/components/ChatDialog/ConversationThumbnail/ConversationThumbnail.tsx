import { getParticipantsNames } from 'utils/functions/chatLogic'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { CustomBadge } from 'components/Badge/Badge'
import { getDurationFromNow } from 'utils/helpers/dateFormatHelpers'
import { ChatAvatar } from '../ChatAvatar/ChatAvatar'
import './ConversationThumbnail.scss'

export const ConversationThumbnail = ({
  groupName,
  participants,
  lastMessage,
  groupPhoto,
  isTeamChat,
  chatType,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const lastMessageText = lastMessage.text
    ? lastMessage.text
    : 'No messages to show'
  const senderInfo = !lastMessage.sender
    ? ''
    : `${
        lastMessage.sender._id === authUser._id
          ? 'You'
          : lastMessage.sender.firstName
      }:`
  const ppAuth = participants.find(pp => pp.userInfo._id === authUser._id)
  const description = `${senderInfo} ${lastMessageText}`
  const groupTitle = groupName
    ? groupName
    : getParticipantsNames(participants, chatType, groupName, authUser)
  const unreadMessageClass = ppAuth.hasUnreadMessage ? 'notification' : ''

  return (
    <>
      <div className='thumbnail-container'>
        <ChatAvatar
          groupPhoto={groupPhoto}
          chatType={chatType}
          isTeamChat={isTeamChat}
          participants={participants}
          avatarSize='small'
        />
        <div className={`info-grid ${unreadMessageClass}`}>
          <p className='title'>{groupTitle}</p>
          {description && <p className='description'>{description}</p>}
        </div>
      </div>
      <p className='last-message-time'>
        {getDurationFromNow(lastMessage.timestamp)}
      </p>
      <CustomBadge variant='dot' invisible={!ppAuth.hasUnreadMessage} />
    </>
  )
}
