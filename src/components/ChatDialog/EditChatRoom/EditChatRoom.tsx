import { useAppSelector } from 'utils/redux/hooks'
import { selectConversation } from 'utils/redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { getGroupChatByChatId } from 'utils/api/chat'
import { FiPlus, FiCamera } from 'react-icons/fi'
import './EditChatRoom.scss'

export const EditChatRoom = () => {
  const currentConversation = useAppSelector(selectConversation)
  const [groupChat, setGroupChat] = useState(null)
  const [profilePictures, setProfilePictures] = useState([])
  const [displayName, setDisplayName] = useState(null)

  useEffect(() => {
    const getGroupChat = async () => {
      try {
        const groupRes = await getGroupChatByChatId(currentConversation._id)
        setGroupChat(groupRes)
        const participants = groupRes.participants.slice(0, 4)
        const pictures = participants.map(
          ({ participant }) => participant.profilePicture
        )
        setProfilePictures(pictures)
      } catch (error) {
        console.error(error)
      }
    }
    getGroupChat()
  }, [currentConversation._id])

  useEffect(() => {
    if (groupChat) {
      const initialDisplayName = groupChat.participants
        .map(
          ({ participant }) =>
            `${participant.firstName} ${participant.lastName}`
        )
        .join(', ')
      setDisplayName(initialDisplayName)
    }
  }, [groupChat])

  console.log('group info:', groupChat)
  console.log('profile pictures array:', profilePictures)

  const handleChange = e => {
    const { value } = e.target
    setDisplayName(value)
  }

  return (
    groupChat && (
      <div className='edit-chat-container'>
        <ChatRoomImage profilePictures={profilePictures} />
        <ChatRoomInfo displayName={displayName} handleChange={handleChange} />
        <GroupMembers groupChat={groupChat} />
      </div>
    )
  )
}

const ChatRoomImage = ({ profilePictures }) => {
  if (profilePictures.length < 4) {
    return (
      <div className='group-photo-container'>
        <div className='photo-grid'>
          {profilePictures.map((picture, index) => (
            <div key={picture} className={index === 0 && 'merged-grid'}>
              <img src={picture} alt='group' />
            </div>
          ))}
          <div className='camera-icon'>
            <FiCamera />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='group-photo-container'>
        <div className='photo-grid'>
          {profilePictures.map(picture => (
            <div key={picture}>
              <img src={picture} alt='group' />
            </div>
          ))}
          <div className='camera-icon'>
            <FiCamera />
          </div>
        </div>
      </div>
    )
  }
}

const ChatRoomInfo = ({ displayName, handleChange }) => {
  return (
    <div className='room-info-grid'>
      <h5>Display Name</h5>
      <input value={displayName} onChange={handleChange} />
    </div>
  )
}

const GroupMembers = ({ groupChat }) => {
  return (
    <div>
      <h5>{groupChat.participants.length} Members</h5>
      <div className='members-container'>
        {groupChat.participants.map(({ participant }) => (
          <div className='members-list' key={participant._id}>
            <div className='avatar-grid'>
              <img src={participant.profilePicture} alt='profile' />
            </div>
            <p>
              {participant.firstName} {participant.lastName}
            </p>
          </div>
        ))}
        <NewMemberButton />
      </div>
    </div>
  )
}

const NewMemberButton = () => {
  return (
    <div className='members-list new-member'>
      <div className='avatar-grid'>
        <FiPlus size={20} />
      </div>
      <p>Invite New Members</p>
    </div>
  )
}
