import { useState } from 'react'
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
import {
  extractConversationAvatars,
  getParticipantsNames,
} from 'utils/functions/chatLogic'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './ChatDialogMain.scss'

const getTitleText = (chatScreen, currentConversation, authUser) => {
  const title = getParticipantsNames(
    currentConversation.participants,
    currentConversation.chatType,
    currentConversation.groupName,
    authUser
  )
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
  const handleCreateChatRoom = () => {
    dispatch(onScreenUpdate(ChatScreen.ComposeNewChat))
  }
  return (
    <div className='main-page-title'>
      <h1>Chats</h1>
      <HiOutlinePencilAlt size={22} onClick={handleCreateChatRoom} />
    </div>
  )
}
export const ChatPageHeader = () => {
  const currentConversation = useAppSelector(selectChat)
  const [openEditNameModal, setOpenEditNameModal] = useState(false)
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
          avatarType={
            currentConversation.chatType === 'group' ? 'grid' : 'single'
          }
        />
      )}
      <h5
        onClick={() => dispatch(onScreenUpdate(ChatScreen.EditChatRoom))}
        className='group-link'
      >
        {getTitleText(chatScreen, currentConversation, authUser)}
        {currentConversation.chatType === 'group' &&
          chatScreen === 'editChatRoom' && (
            <BiPencil onClick={() => setOpenEditNameModal(true)} />
          )}
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
