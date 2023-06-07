import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  selectConversation,
  setCurrentConversation,
  setSelectedMember,
} from 'utils/redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { getGroupChatByChatId, updateGroupChat } from 'utils/api/chat'
import { FiPlus } from 'react-icons/fi'
import './EditChatRoom.scss'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'

export const EditChatRoom = ({ updateChatScreen }) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const [groupChat, setGroupChat] = useState(null)
  const [profilePictures, setProfilePictures] = useState([])
  const [initialDisplayName, setInitialDisplayName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    const getGroupChat = async () => {
      try {
        const groupRes = await getGroupChatByChatId(currentConversation._id)
        setGroupChat(groupRes)

        const participants = groupRes.participants.filter(
          ({ participant }) => participant._id !== authUser._id
        )
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
    if (groupChat && !isModified) {
      const formatDisplayName = groupChat.participants
        .filter(({ participant }) => participant._id !== authUser._id)
        .map(
          ({ participant }) =>
            `${participant.firstName} ${participant.lastName}`
        )
        .join(', ')
      setInitialDisplayName(formatDisplayName)
      setDisplayName(formatDisplayName)
    }
  }, [groupChat, authUser._id])

  const handleChange = e => {
    const { value } = e.target
    setDisplayName(value)
    setIsModified(true)
  }

  const handleBlurGroupNameUpdate = async () => {
    try {
      const updatedDisplayName = isModified ? displayName : initialDisplayName
      setDisplayName(updatedDisplayName)
      await updateGroupChat(authUser._id, currentConversation._id, {
        groupName: updatedDisplayName,
      })

      dispatch(
        setCurrentConversation({
          _id: currentConversation._id,
          isGroup: true,
          displayName: updatedDisplayName,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleMemberClick = (
    memberId: string,
    firstName: string,
    lastName: string,
    profilePicture: string
  ) => {
    updateChatScreen('memberProfile')
    dispatch(
      setSelectedMember({ _id: memberId, firstName, lastName, profilePicture })
    )
  }

  return (
    groupChat && (
      <div className='edit-chat-container'>
        <AvatarGrid
          picturesArray={profilePictures}
          avatarSize={'large'}
          chatType={'group'}
        />
        <ChatRoomInfo
          displayName={displayName}
          handleChange={handleChange}
          handleBlurGroupNameUpdate={handleBlurGroupNameUpdate}
          isModified={isModified}
          initialDisplayName={initialDisplayName}
        />
        <GroupMembers
          groupChat={groupChat}
          handleMemberClick={handleMemberClick}
          updateChatScreen={updateChatScreen}
          authUser={authUser}
        />
      </div>
    )
  )
}

const ChatRoomInfo = ({
  displayName,
  handleChange,
  handleBlurGroupNameUpdate,
  isModified,
  initialDisplayName,
}) => {
  const displayValue = !isModified ? initialDisplayName : displayName

  return (
    <div className='room-info-grid'>
      <h5>Display Name</h5>
      <input
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlurGroupNameUpdate}
      />
    </div>
  )
}

const GroupMembers = ({
  groupChat,
  handleMemberClick,
  updateChatScreen,
  authUser,
}) => {
  return (
    <div>
      <h5>{groupChat.participants.length} Members</h5>
      <div className='members-container'>
        {groupChat.participants.map(({ participant }) => {
          const {
            _id: participantId,
            firstName,
            lastName,
            profilePicture,
          } = participant
          return (
            <div
              className='members-list'
              key={participantId}
              onClick={() =>
                handleMemberClick(
                  participantId,
                  firstName,
                  lastName,
                  profilePicture
                )
              }
            >
              <div className='avatar-grid'>
                <img src={profilePicture} alt='profile' />
              </div>
              <p>
                {firstName} {lastName}{' '}
                {participantId === authUser._id && (
                  <span className='you-identifier'>(You)</span>
                )}
              </p>
            </div>
          )
        })}
        <NewMemberButton updateChatScreen={updateChatScreen} />
      </div>
    </div>
  )
}

const NewMemberButton = ({ updateChatScreen }) => {
  return (
    <div
      className='members-list'
      onClick={() => updateChatScreen('inviteNewMembers')}
    >
      <div className='avatar-grid'>
        <FiPlus size={20} />
      </div>
      <p>Invite New Members</p>
    </div>
  )
}
