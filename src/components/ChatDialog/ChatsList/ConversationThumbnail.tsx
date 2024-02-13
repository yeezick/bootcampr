import { getParticipantsNames } from 'utils/functions/chatLogic'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
import { UserThumbnail } from '../UserThumbnail/UserThumbnail'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { CustomBadge } from 'components/Badge/Badge'
import { getDurationFromNow } from 'utils/helpers/dateFormatHelpers'

export const ConversationThumbnail = ({
  groupName,
  participants,
  lastMessage,
  lastActive,
  chatType,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const pictures = extractConversationAvatars(participants, authUser._id)
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
  const ppAuth = participants.find(pp => pp.participant._id === authUser._id)
  const description = `${senderInfo} ${lastMessageText}`
  const groupTitle = groupName
    ? groupName
    : getParticipantsNames(participants, chatType, groupName, authUser)
  const unreadMessageClass = ppAuth.hasUnreadMessage ? 'notification' : ''

  return (
    <>
      <UserThumbnail
        title={groupTitle}
        description={description}
        profilePicture={pictures}
        avatarType={chatType === 'group' ? 'grid' : 'single'}
        avatarSize='medium'
        className={unreadMessageClass}
      />
      <p className='last-message-time'>
        {getDurationFromNow(lastMessage.timestamp)}
      </p>
      <CustomBadge variant='dot' invisible={!ppAuth.hasUnreadMessage} />
    </>
  )
}
