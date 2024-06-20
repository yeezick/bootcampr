import Avatar from '@mui/material/Avatar'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import {
  extractConversationAvatars,
  getInitials,
} from 'utils/functions/chatLogic'
import './ChatAvatar.scss'

const MINIMUM_TEAM_SIZE = 5

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
  const membersCount = participants.length

  if (groupPhoto) {
    avatarComponent = (
      <GroupPhoto groupPhoto={groupPhoto} avatarSize={avatarSize} />
    )
  } else {
    if (membersCount > MINIMUM_TEAM_SIZE) {
      avatarComponent = (
        <GroupAvatar
          avatarSize={avatarSize}
          isTeamChat={isTeamChat}
          membersCount={membersCount}
        />
      )
    } else {
      const pictures = extractConversationAvatars(participants, authUserId)
      avatarComponent = (
        <AvatarGrid pictures={pictures} avatarSize={avatarSize} />
      )
    }
  }

  return (
    <div className={`photo-container ${avatarSize}`}>{avatarComponent}</div>
  )
}

const GroupPhoto = ({ groupPhoto, avatarSize }) => {
  return (
    <img
      src={groupPhoto}
      className={`group-photo ${avatarSize}`}
      alt='groupPhoto'
    />
  )
}

const GroupAvatar = ({ avatarSize, isTeamChat, membersCount }) => {
  const displayTeamName = avatarSize === 'large' ? 'Team Chat' : 'TC'
  const displayGroupName = getGroupChatAvatarText(membersCount)
  const avatarClassname = isTeamChat ? 'team' : 'group'
  return (
    <Avatar className={`chat-avatar ${avatarSize} ${avatarClassname}`}>
      {isTeamChat ? displayTeamName : displayGroupName}
    </Avatar>
  )
}

const UserAvatar = ({ avatarSize, userInfo }) => {
  const avatar = userInfo?.profilePicture || ''
  const displayName = getInitials(userInfo?.firstName, userInfo?.lastName)

  return (
    <Avatar
      className={`chat-avatar ${avatarSize} ${avatar ? '' : 'user'}`}
      src={avatar}
    >
      {!avatar && displayName}
    </Avatar>
  )
}

const getGroupChatAvatarText = participantsCount => {
  let minTeamSize = 6
  let maxMembersSize = 5
  let maxTeamSize = minTeamSize + maxMembersSize
  let adjustedSize

  if (minTeamSize === participantsCount) return '5+'

  while (true) {
    if (minTeamSize < participantsCount && participantsCount < maxTeamSize) {
      adjustedSize = minTeamSize
      break
    } else {
      minTeamSize = maxTeamSize - 1
      maxTeamSize = maxTeamSize + maxMembersSize
    }
  }
  return `${adjustedSize}+`
}
