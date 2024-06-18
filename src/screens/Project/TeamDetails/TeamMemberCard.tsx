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
import { useChatSocketEvents } from 'components/Socket/chatSocket'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'
import { useState } from 'react'

export const TeamMemberCard = ({ roleHeader, member }) => {
  const { _id: memberId } = member

  return (
    <div className='member-card'>
      <MemberInfo member={member} roleHeader={roleHeader} />
      <MemberButtons memberId={memberId} />
    </div>
  )
}

const MemberInfo = ({ member, roleHeader }) => {
  const { firstName, lastName, role, _id: memberId } = member
  const userRoleByProject =
    role === getPreviousRoleByHeader(roleHeader)
      ? role
      : getPreviousRoleByHeader(roleHeader)
  console.log(userRoleByProject)
  return (
    <div className='member-info'>
      <div className='member-img'>
        <TeamAvatar size='medium' userId={memberId} />
      </div>
      <div className='member-desc'>
        <p className='name'>
          {firstName} {lastName}
        </p>
        <p className='role'>{userRoleByProject}</p>
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
  const { createNewRoom } = useChatSocketEvents(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChatMemberClick = async () => {
    setIsLoading(true)
    try {
      if (isSandboxId(userExperience) || isWaitlistExperience(userExperience)) {
        dispatch(toggleChatOpen())
        dispatch(onScreenUpdate(ChatScreen.Main))
        setIsLoading(false)
        return
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
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const handleProfile = () => window.open(`/users/${memberId}`)

  return (
    <ButtonContainer justify='space-evenly'>
      {!isCurrentUser && (
        <SecondaryButton
          loading={isLoading}
          onClick={handleChatMemberClick}
          label='Send message'
        />
      )}
      <PrimaryButton onClick={handleProfile} label='View profile' />
    </ButtonContainer>
  )
}

const getPreviousRoleByHeader = header => {
  if (header === 'UX Designers') {
    return 'UX Designer'
  } else if (header === 'Software Engineers') {
    return 'Software Engineer'
  } else if (header === 'Product Manager') {
    return 'Product Manager'
  }
}
