import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'
import { createOrGetPrivateChatRoom } from 'utils/api/chat'
import {
  onScreenUpdate,
  processChatRoom,
  setCurrentChat,
  toggleChatOpen,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen } from 'utils/data/chatConstants'
import { useSocketEvents } from 'components/Notifications/Socket'
import {
  PrimaryButton,
  SecondaryButton,
} from 'components/Buttons/ButtonVariants'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'

export const TeamMemberCard = ({ member }) => {
  const { _id: memberId } = member

  return (
    <div className='member-card'>
      <MemberInfo member={member} />
      <MemberButtons memberId={memberId} />
    </div>
  )
}

const MemberInfo = ({ member }) => {
  const { firstName, lastName, role, _id: memberId } = member
  return (
    <div className='member-info'>
      <div className='member-img'>
        <TeamAvatar size='medium' userId={memberId} />
      </div>
      <div className='member-desc'>
        <p className='name'>
          {firstName} {lastName}
        </p>
        <p className='role'>{role}</p>
      </div>
    </div>
  )
}

const MemberButtons = ({ memberId }) => {
  const {
    _id: loggedInUserId,
    payment: { experience: userExperience },
  } = useAppSelector(selectAuthUser)
  const isCurrentUser = memberId === loggedInUserId
  const dispatch = useAppDispatch()
  const { createNewRoom } = useSocketEvents(false)
  const navigate = useNavigate()

  const handleChatMemberClick = async () => {
    try {
      if (isSandboxId(userExperience) || isWaitlistExperience(userExperience)) {
        dispatch(toggleChatOpen())
        dispatch(onScreenUpdate(ChatScreen.Main))
      }
      const chatResponse = await createOrGetPrivateChatRoom(memberId)
      let room = chatResponse.chatRoom
      room = await dispatch(processChatRoom(room)).unwrap()
      if (chatResponse.isNew) {
        createNewRoom({ chatRoom: room, receiverIds: [memberId] })
      }
      dispatch(setCurrentChat(room))
      dispatch(toggleChatOpen())
      dispatch(onScreenUpdate(ChatScreen.ChatRoom))
    } catch (error) {
      console.error(error)
    }
  }

  const handleProfile = () => window.open(`/users/${memberId}`)

  return (
    <div className='member-buttons'>
      {!isCurrentUser && (
        <SecondaryButton
          handler={handleChatMemberClick}
          text='Send message'
          sx={buttonSx}
        />
      )}
      <PrimaryButton
        handler={handleProfile}
        text='View profile'
        sx={buttonSx}
      />
    </div>
  )
}

const buttonSx = {
  height: '32px',
  fontSize: '12px',
  backgroundColor: 'red',
}
