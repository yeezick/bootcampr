import Avatar from '@mui/material/Avatar'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import {
  extractConversationAvatars,
  getInitials,
} from 'utils/functions/chatLogic'
import { FiCamera } from 'react-icons/fi'
import { UserInterface } from 'interfaces'
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
      <ChatUserAvatar
        avatarSize={avatarSize}
        userInfo={membersWithoutAuth[0].userInfo}
        profilePicture={membersWithoutAuth[0].userInfo.profilePicture}
      />
    )
  }

  if (chatType === 'group') {
    let avatarComponent

    if (groupPhoto) {
      avatarComponent = (
        <GroupPhotoAvatar groupPhoto={groupPhoto} avatarSize={avatarSize} />
      )
    } else if (isTeamChat) {
      avatarComponent = (
        <ChatUserAvatar
          avatarSize={avatarSize}
          profilePicture={groupPhoto}
          isTeam
        />
      )
    } else {
      const pictures = extractConversationAvatars(participants, authUser._id)
      avatarComponent = (
        <AvatarGrid pictures={pictures} avatarSize={avatarSize} />
      )
    }

    return (
      <div className={`group-photo-container ${avatarSize}`}>
        {avatarComponent}
      </div>
    )
  }
  return null
}

//in post soft launch design
const CameraUploadIcon = () => {
  return (
    <div className='camera-icon'>
      <FiCamera />
    </div>
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

interface ChatAvatarInterface {
  avatarSize: string
  isTeam?: boolean
  userInfo?: UserInterface
  profilePicture?: string
}

export const ChatUserAvatar = ({
  avatarSize,
  isTeam,
  userInfo,
  profilePicture,
}: ChatAvatarInterface) => {
  const avatarSizeStyles = {
    'x-small': {
      fontSize: 16,
      height: 32,
      width: 32,
    },
    small: {
      fontSize: 22,
      height: 40,
      width: 40,
    },
    large: {
      fontSize: 28,
      height: 96,
      width: 96,
    },
  }

  const avatarStyle = {
    fontFamily: 'Roboto',
    textAlign: 'center',
    backgroundColor: isTeam ? '#1A237E' : '#FFA726',
    color: isTeam ? '#FFA726' : '#1A237E',
    ...avatarSizeStyles[avatarSize],
  }

  const displayTeamName = avatarSize === 'large' ? 'Team Chat' : 'TC'
  const displayName = isTeam
    ? displayTeamName
    : getInitials(userInfo.firstName, userInfo.lastName)

  return (
    <Avatar sx={avatarStyle} src={profilePicture}>
      {!profilePicture && displayName}
    </Avatar>
  )
}
