import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
import Avatar from '@mui/material/Avatar'
import { FiCamera } from 'react-icons/fi'
import './ChatAvatar.scss'

export const ChatAvatar = ({
  groupPhoto,
  chatType,
  isTeamChat = true,
  participants,
  avatarSize,
}) => {
  const authUser = useAppSelector(selectAuthUser)

  const membersWithoutAuth = participants.filter(
    ({ userInfo }) => userInfo._id !== authUser._id
  )

  if (chatType === 'private') {
    return (
      <TeamAvatar
        userId={membersWithoutAuth[0].userInfo._id}
        size={avatarSize}
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
      avatarComponent = <TeamChatAvatar avatarSize={avatarSize} />
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
  // https://i.postimg.cc/L8jC1rSp/default-group-avatar.png
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

const TeamChatAvatar = ({ avatarSize }) => {
  const avatarSizeStyles = {
    small: {
      fontSize: 16,
      height: 32,
      width: 32,
    },
    medium: {
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
    backgroundColor: '#1A237E',
    color: '#FFA726',
    ...avatarSizeStyles[avatarSize],
  }

  const displayName = avatarSize === 'large' ? 'Team Chat' : 'TC'

  return <Avatar sx={avatarStyle}>{displayName}</Avatar>
}
