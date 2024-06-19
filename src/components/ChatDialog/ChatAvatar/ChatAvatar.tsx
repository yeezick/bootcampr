import Avatar from '@mui/material/Avatar'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import {
  extractConversationAvatars,
  getInitials,
} from 'utils/functions/chatLogic'
import './ChatAvatar.scss'

export const ChatAvatar = ({
  groupPhoto,
  chatType,
  isTeamChat,
  participants,
  avatarSize,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const membersWithoutAuth = participants.filter(
    ({ userInfo }) => userInfo._id !== authUser._id
  )

  if (chatType === 'private') {
    return (
      <div className={`photo-container ${avatarSize}`}>
        <UserAvatar
          avatarSize={avatarSize}
          userInfo={membersWithoutAuth[0].userInfo}
        />
      </div>
    )
  }

  if (chatType === 'group') {
    return (
      <GroupChatAvatar
        groupPhoto={groupPhoto}
        isTeamChat={isTeamChat}
        participants={participants}
        avatarSize={avatarSize}
        authUserId={authUser._id}
      />
    )
  }
  return null
}

const GroupChatAvatar = ({
  groupPhoto,
  isTeamChat,
  participants,
  avatarSize,
  authUserId,
}) => {
  let avatarComponent

  if (groupPhoto) {
    avatarComponent = (
      <GroupPhotoAvatar groupPhoto={groupPhoto} avatarSize={avatarSize} />
    )
  } else if (isTeamChat) {
    avatarComponent = <TeamChatAvatar avatarSize={avatarSize} />
  } else {
    const pictures = extractConversationAvatars(participants, authUserId)
    avatarComponent = <AvatarGrid pictures={pictures} avatarSize={avatarSize} />
  }

  return (
    <div className={`photo-container ${avatarSize}`}>{avatarComponent}</div>
  )
}

const GroupPhotoAvatar = ({ groupPhoto, avatarSize }) => {
  return (
    <img
      src={groupPhoto}
      className={`group-photo ${avatarSize}`}
      alt='groupPhoto'
    />
  )
}

const TeamChatAvatar = ({ avatarSize }) => {
  const displayTeamName = avatarSize === 'large' ? 'Team Chat' : 'TC'

  return (
    <Avatar className={`user-avatar ${avatarSize} team`}>
      {displayTeamName}
    </Avatar>
  )
}

const UserAvatar = ({ avatarSize, userInfo }) => {
  const avatar = userInfo?.profilePicture || ''
  const displayName = getInitials(userInfo?.firstName, userInfo?.lastName)

  return (
    <Avatar
      className={`user-avatar ${avatarSize} ${avatar ? '' : 'user'}`}
      src={avatar}
    >
      {!avatar && displayName}
    </Avatar>
  )
}
