import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiPencil } from 'react-icons/bi'
import { ChatScreen } from 'utils/data/chatConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getParticipantsNames } from 'utils/functions/chatLogic'
import {
  selectAuthUser,
  selectUserExperience,
} from 'utils/redux/slices/userSlice'
import { updateGroupChat } from 'utils/api/chat'
import {
  onBackArrowClick,
  onScreenUpdate,
  resetCurrentChat,
  selectChat,
  selectChatUI,
  setActiveChatRoomId,
  updateCurrentChat,
} from 'utils/redux/slices/chatSlice'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { ChatAvatar } from '../ChatAvatar/ChatAvatar'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import './ChatDialogMain.scss'

const getTitleText = (chatScreen, currentConversation, authUser) => {
  const title =
    currentConversation.participants.length > 5
      ? 'Group Chat'
      : getParticipantsNames(
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
  }
  return titleTextLookup[chatScreen] || ''
}

export const ChatMainPageHeader = () => {
  const userExperience = useAppSelector(selectUserExperience)
  const dispatch = useAppDispatch()
  const handleCreateChatRoom = () => {
    dispatch(onScreenUpdate(ChatScreen.ComposeNewChat))
    dispatch(resetCurrentChat())
  }

  return (
    <div className='main-page-title'>
      <h1>Chats</h1>
      {isSandboxId(userExperience) || userExperience === 'waitlist' ? (
        <HiOutlinePencilAlt
          size={22}
          style={{ color: '#ababab', cursor: 'default' }}
        />
      ) : (
        <HiOutlinePencilAlt size={22} onClick={handleCreateChatRoom} />
      )}
    </div>
  )
}

export const ChatPageHeader = () => {
  const [displayName, setDisplayName] = useState('')
  const currentConversation = useAppSelector(selectChat)
  const [openEditNameModal, setOpenEditNameModal] = useState(false)
  const { chatScreen } = useAppSelector(selectChatUI)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const { groupPhoto, chatType, isTeamChat, participants } = currentConversation
  const onGroupChatEditScreen =
    chatType === 'group' && chatScreen === 'editChatRoom'
  const headerTitle =
    currentConversation.groupName ||
    getTitleText(chatScreen, currentConversation, authUser)

  const handleBackArrowClick = () => {
    dispatch(setActiveChatRoomId(null))
    dispatch(onBackArrowClick())
  }

  const handleChangeChatName = async () => {
    try {
      setDisplayName(displayName)
      await updateGroupChat(currentConversation._id, {
        groupName: displayName,
      })
      const updatedChat = { ...currentConversation, groupName: displayName }
      dispatch(updateCurrentChat(updatedChat))
      dispatch(successSnackbar('Successfully updated the chat name.'))
      setOpenEditNameModal(false)
    } catch (error) {
      console.error(error)
      setOpenEditNameModal(false)
      setDisplayName('')
      dispatch(
        errorSnackbar("Couldn't update the chat name. Please try again later.")
      )
    }
  }

  const handleChange = e => {
    const { value } = e.target
    setDisplayName(value)
  }

  const handleCancel = () => {
    setOpenEditNameModal(false)
    setDisplayName('')
  }

  const handleChangeScreen = () => {
    if (chatType === 'group') {
      dispatch(onScreenUpdate(ChatScreen.EditChatRoom))
    } else {
      const user = participants.find(
        participant => participant.userInfo._id !== authUser._id
      )
      if (user) {
        const userId = user.userInfo._id
        window.open(`/users/${userId}`)
      }
    }
  }

  const handleEditModal = () => {
    setOpenEditNameModal(true)
  }

  return (
    <div className='page-title'>
      <FiArrowLeft size={24} onClick={handleBackArrowClick} />
      <ChatAvatar
        groupPhoto={groupPhoto}
        chatType={chatType}
        isTeamChat={isTeamChat}
        participants={participants}
        avatarSize='x-small'
      />
      <div className='title-with-icon'>
        <h5 onClick={handleChangeScreen} className={`group-link ${chatScreen}`}>
          {headerTitle}
        </h5>
        {onGroupChatEditScreen && (
          <div className='edit-pen'>
            <BiPencil onClick={handleEditModal} size={16} />
          </div>
        )}
      </div>
      <CommonModal
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
      />
    </div>
  )
}
