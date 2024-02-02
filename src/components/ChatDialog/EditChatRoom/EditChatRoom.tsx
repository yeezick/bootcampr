import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { UserThumbnail } from '../UserThumbnail/UserThumbnail'
import './EditChatRoom.scss'
import { onScreenUpdate, selectChat } from 'utils/redux/slices/chatSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
import { ChatScreen } from 'utils/data/chatConstants'
import { Button } from '@mui/material'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import { FiPlus } from 'react-icons/fi'
import './EditChatRoom.scss'
export const EditChatRoom = () => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const participants = currentConversation.participants

  const pictures = extractConversationAvatars(participants, authUser._id)
  const handleInviteMember = () => {
    dispatch(onScreenUpdate(ChatScreen.InviteNewMembers))
  }
  return (
    <div className='edit-chat-container'>
      <AvatarGrid pictures={pictures} avatarSize='large' avatarType='grid' />
      <div className='members-container'>
        <p>Member</p>
        <div className='members-list'>
          {participants.map(pp => (
            <div className='member'>
              <UserThumbnail
                title={`${pp.participant.firstName} ${pp.participant.lastName}`}
                description={pp.participant.role}
                profilePicture={pp.participant.profilePicture}
                avatarSize='medium'
                avatarType='single'
              />
            </div>
          ))}
        </div>
        <div className='invite-button'>
          <Button
            onClick={handleInviteMember}
            variant='text'
            sx={{
              color: '#1A237E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              columnGap: '8px',
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
