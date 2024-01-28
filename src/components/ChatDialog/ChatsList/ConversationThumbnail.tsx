import { RxDotFilled } from 'react-icons/rx'
import {
  formatLastMessageTimestamp,
  getParticipantsNames,
} from 'utils/functions/chatLogic'
import { AvatarGrid } from 'components/ChatDialog/AvatarGrid/AvatarGrid'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
import { UserThumbnail } from '../UserThumbnail/UserThumbnail'
import { Badge } from '@mui/material'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
export const ConversationThumbnail = ({
  groupName,
  participants,
  lastMessage,
  lastActive,
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
  console.log('ppAuth', ppAuth)
  const description = `${senderInfo} ${lastMessageText}`
  const groupTitle = groupName
    ? groupName
    : getParticipantsNames(participants, 'group', groupName, authUser)
  return (
    <>
      <UserThumbnail
        title={groupTitle}
        description={description}
        profilePicture={pictures}
        avatarType='grid'
        avatarSize='medium'
      />
      <div>{formatLastMessageTimestamp(lastMessage.timestamp)}</div>
      <CustomBadge variant='dot' invisible={!ppAuth.hasUnreadMessage} />
    </>
  )
}
interface BadgeInterface {
  content?: React.ReactNode
  invisible?: boolean
  variant?: 'standard' | 'dot'
  children?: React.ReactNode
}

// Define the component with the specified interface
export const CustomBadge: React.FC<BadgeInterface> = ({
  content,
  invisible = false,
  variant = 'standard',
  children,
}) => {
  return (
    <div>
      <Badge
        color='secondary'
        badgeContent={content}
        variant={variant}
        invisible={invisible}
      >
        {children}
      </Badge>
    </div>
  )
}

// const thumbnailTextClass =
//   lastMessage && messageIsUnread ? 'unread-message' : ''
// const thumbnailUnreadDotClass = messageIsUnread
//   ? 'unread-dot-visible'
//   : 'unread-dot-hidden'
//   if (participants.length > 2) {
//     const pictures = extractConversationAvatars(participants, authUser._id)
//     return (
//       <>
//         <div className='avatar-grid'>
//           <AvatarGrid
//             pictures={pictures}
//             avatarSize={'medium'}
//             chatType={'group'}
//           />
//         </div>
//         <div className='thumbnail-right'>
//           <div className='thread-details-grid'>
//             {/* <h5 className={thumbnailTextClass}>{groupName || 'Group Chat'}</h5> */}
//             <LastMessageText
//               lastMessage={lastMessage}
//               authUser={authUser}
//               // messageIsUnread={messageIsUnread}
//             />
//           </div>
//           <div className='dot-grid'>
//             {lastMessage ? (
//               <>
//                 <p>{formatLastMessageTimestamp(lastMessage.timestamp)}</p>
//                 {/* <RxDotFilled size={26} className={thumbnailUnreadDotClass} /> */}
//               </>
//             ) : (
//               <>
//                 <p>{formatLastMessageTimestamp(lastActive)}</p>
//                 <RxDotFilled size={26} className='unread-dot-hidden' />
//               </>
//             )}
//           </div>
//         </div>
//       </>
//     )
//   }
//   if (participants.length === 2) {
//     const recipient = participants.filter(
//       participant => participant._id !== authUser._id
//     )
//     return (
//       <>
//         <AvatarGrid
//           pictures={recipient[0].profilePicture}
//           avatarSize={'medium'}
//           chatType={'private'}
//         />
//         <div className='thumbnail-right'>
//           <div className='thread-details-grid'>
//             {/* <h5 className={thumbnailTextClass}> */}
//               {recipient[0].firstName} {recipient[0].lastName}
//             </h5>
//             {/* <LastMessageText
//               lastMessage={lastMessage}
//               authUser={authUser}
//               // messageIsUnread={messageIsUnread}
//             /> */}
//           </div>
//           <div className='dot-grid'>
//             {lastMessage ? (
//               <>
//                 <p>{formatLastMessageTimestamp(lastMessage.timestamp)}</p>
//                 {/* <RxDotFilled size={26} className={thumbnailUnreadDotClass} /> */}
//               </>
//             ) : (
//               <>
//                 <p>{formatLastMessageTimestamp(lastActive)}</p>
//                 <RxDotFilled size={26} className='unread-dot-hidden' />
//               </>
//             )}
//           </div>
//         </div>
//       </>
//     )
//   }
// }
