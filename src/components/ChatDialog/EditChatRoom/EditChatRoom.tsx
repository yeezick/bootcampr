import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  onScreenUpdate,
  selectConversation,
  setCurrentConversation,
  setSelectedMember,
} from 'utils/redux/slices/chatSlice'
import { useEffect, useState } from 'react'
import { getGroupChatByChatId, updateGroupChat } from 'utils/api/chat'
import { FiPlus } from 'react-icons/fi'
import { AvatarGrid } from 'components/ChatDialog/AvatarGrid/AvatarGrid'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
import { ChatScreen } from 'utils/data/chatConstants'
import './EditChatRoom.scss'

export const EditChatRoom = () => {
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

        const pictures = extractConversationAvatars(
          groupRes.participants,
          authUser._id
        )
        setProfilePictures(pictures)
      } catch (error) {
        console.error(error)
      }
    }
    getGroupChat()
  }, [authUser._id, currentConversation._id])

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
  }, [groupChat, authUser._id, isModified])

  const handleMemberClick = (
    memberId: string,
    firstName: string,
    lastName: string,
    profilePicture: string
  ) => {
    dispatch(onScreenUpdate(ChatScreen.MemberProfile))
    dispatch(
      setSelectedMember({ _id: memberId, firstName, lastName, profilePicture })
    )
  }

  return (
    groupChat && (
      <div className='edit-chat-container'>
        <AvatarGrid
          pictures={profilePictures}
          avatarSize={'large'}
          chatType={'group'}
        />
        <GroupMembers
          groupChat={groupChat}
          handleMemberClick={handleMemberClick}
          dispatch={dispatch}
          authUser={authUser}
        />
      </div>
    )
  )
}

const GroupMembers = ({ groupChat, handleMemberClick, dispatch, authUser }) => {
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
        <NewMemberButton dispatch={dispatch} />
      </div>
    </div>
  )
}

const NewMemberButton = ({ dispatch }) => {
  return (
    <div
      className='members-list'
      onClick={() => dispatch(onScreenUpdate(ChatScreen.InviteNewMembers))}
    >
      <div className='avatar-grid'>
        <FiPlus size={20} />
      </div>
      <p>Invite New Members</p>
    </div>
  )
}
