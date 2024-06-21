import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { UserDetails } from '../UserDetails/UserDetails'
import './EditChatRoom.scss'
import { onScreenUpdate, selectChat } from 'utils/redux/slices/chatSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { getSortedParticipants } from 'utils/functions/chatLogic'
import { ChatScreen } from 'utils/data/chatConstants'
import { ChatAvatar } from '../ChatAvatar/ChatAvatar'
import './EditChatRoom.scss'
import { TextButton } from 'components/Buttons'

export const EditChatRoom = () => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const { groupPhoto, chatType, isTeamChat, participants } = currentConversation

  const handleInviteMember = () => {
    dispatch(onScreenUpdate(ChatScreen.InviteNewMembers))
  }

  const sortedParticipants = getSortedParticipants(participants, authUser._id)
  const hideButton = currentConversation.isTeamChat

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
            <div className='member' key={pp.userInfo._id}>
              <UserDetails
                key={pp.userInfo._id}
                title={`${pp.userInfo.firstName} ${pp.userInfo.lastName}`}
                description={pp.userInfo.role}
                avatarSize='x-small'
                userInfo={pp.userInfo}
              />
            </div>
          ))}
        </div>
        {!hideButton && (
          <TextButton
            onClick={handleInviteMember}
            label='Invite New Member'
            startIcon='plus'
          />
        )}
      </div>
    </div>
  )
}
