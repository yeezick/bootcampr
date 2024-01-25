import { FiArrowLeft } from 'react-icons/fi'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiPencil } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { ChatScreen } from 'utils/data/chatConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  onBackArrowClick,
  onScreenUpdate,
  selectChat,
  selectChatUI,
} from 'utils/redux/slices/chatSlice'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { extractConversationAvatars } from 'utils/functions/chatLogic'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { Participant } from 'interfaces/ChatInterface'
import './ChatDialogMain.scss'
//group or private - main or pages
//this should be default value and should be handled somewhere else
const getParticipantsNames = (currentConversation, authUser) => {
  const participantsWithoutAuthUser = currentConversation.participants
    .filter(({ participant }) => participant._id !== authUser._id)
    .map(
      ({ participant }) => `${participant.firstName} ${participant.lastName}`
    )
    .join(',')
  if (currentConversation.chatType === 'private') {
    return participantsWithoutAuthUser
  } else {
    const authUserName = `${authUser.firstName} ${authUser.lastName}`
    return currentConversation.groupName
      ? currentConversation.groupName
      : participantsWithoutAuthUser.concat(', ', authUserName)
  }
}
const getTitleText = (chatScreen, currentConversation, authUser) => {
  const title = getParticipantsNames(currentConversation, authUser)
  const titleTextLookup = {
    [ChatScreen.ChatRoom]: `${title}`,
    [ChatScreen.ComposeNewChat]: 'New Chat Room',
    [ChatScreen.EditChatRoom]: `${title}`,
    [ChatScreen.InviteNewMembers]: 'Invite Members',
    // [ChatScreen.MemberProfile]: `${selectedMember.firstName}'s Profile`,
  }
  return titleTextLookup[chatScreen] || ''
}
export const ChatMainPageHeader = () => {
  const dispatch = useAppDispatch()

  const handleComposeMessage = () => {
    dispatch(onScreenUpdate(ChatScreen.ComposeNewChat))
  }
  return (
    <div className='main-page-title'>
      <h1>Chats</h1>
      <HiOutlinePencilAlt size={22} onClick={handleComposeMessage} />
    </div>
  )
}
export const ChatPageHeader = () => {
  const currentConversation = useAppSelector(selectChat)
  // const selectedMember = useAppSelector(selectSelectedMember)
  const { chatScreen } = useAppSelector(selectChatUI)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const handleBackArrowClick = () => {
    dispatch(onBackArrowClick())
  }
  const profilePictures = extractConversationAvatars(
    currentConversation.participants,
    authUser._id
  )
  return (
    <div className='page-title'>
      <FiArrowLeft size={23} onClick={handleBackArrowClick} />
      {profilePictures.length > 0 && (
        <AvatarGrid
          pictures={profilePictures}
          avatarSize={'small'}
          chatType={currentConversation.chatType ? 'group' : 'private'}
        />
      )}
      <h5
        // onClick={() => updateScreen(ChatScreen.EditChatRoom)}
        className='group-link'
      >
        {getTitleText(chatScreen, currentConversation, authUser)}
        {/* {currentConversation.isGroupChat && chatScreen === 'editChatRoom' && (
          <BiPencil onClick={() => setOpenEditNameModal(true)} />
        )} */}
      </h5>
      {/* <CommonModal
        isOpen={openEditNameModal}
        heading='Edit Chat Name'
        body='Changing the name of the group changes it for everyone.'
        inputType='string'
        inputValue={displayName}
        inputOnChange={handleChange}
        confirmButtonLabel='Save Name'
        confirmButtonDisabled={!displayName}
        handleConfirm={handleChangeChatName}
        cancelButtonLabel='Cancel'
        handleCancel={handleCancel}
      /> */}
    </div>
  )
}
