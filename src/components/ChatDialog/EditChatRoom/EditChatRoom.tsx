import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { AvatarUserDetail } from '../AvatarUserDetail/AvatarUserDetail'
import './EditChatRoom.scss'
import { onScreenUpdate, selectChat } from 'utils/redux/slices/chatSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  extractConversationAvatars,
  getSortedParticipants,
} from 'utils/functions/chatLogic'
import { ChatScreen } from 'utils/data/chatConstants'
import { Button } from '@mui/material'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import { FiPlus } from 'react-icons/fi'
import './EditChatRoom.scss'
import { ChatAvatar } from '../ChatAvatar/ChatAvatar'

export const EditChatRoom = () => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const { groupPhoto, chatType, isTeamChat, participants } = currentConversation

  const handleInviteMember = () => {
    dispatch(onScreenUpdate(ChatScreen.InviteNewMembers))
  }

  const sortedParticipants = getSortedParticipants(participants, authUser._id)

  return (
    <div className='edit-chat-container'>
      <ChatAvatar
        groupPhoto={groupPhoto}
        chatType={chatType}
        isTeamChat={isTeamChat}
        participants={participants}
        avatarSize='large'
      />

      <div className='members-container'>
        <p>Member</p>
        <div className='members-list'>
          {sortedParticipants.map(pp => (
            <div className='member'>
              <AvatarUserDetail
                key={pp.userInfo._id}
                title={`${pp.userInfo.firstName} ${pp.userInfo.lastName}`}
                description={pp.userInfo.role}
                avatarSize='medium'
                userId={pp.userInfo._id}
              />
            </div>
          ))}
        </div>
        <div className='invite-button'>
          <Button
            onClick={handleInviteMember}
            variant='text'
            sx={{
              alignItems: 'center',
              color: '#1A237E',
              columnGap: '8px',
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '8px 16px 8px 12px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <FiPlus size={20} />
            Invite New Member
          </Button>
        </div>
      </div>
    </div>
  )
}
