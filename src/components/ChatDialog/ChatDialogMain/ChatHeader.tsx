import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiPencil } from 'react-icons/bi'
import { ChatScreen } from 'utils/data/chatConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  extractConversationAvatars,
  getParticipantsNames,
} from 'utils/functions/chatLogic'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { updateGroupChat } from 'utils/api/chat'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import {
  onBackArrowClick,
  onScreenUpdate,
  selectChat,
  selectChatUI,
  setActiveChatRoomId,
  updateCurrentChat,
} from 'utils/redux/slices/chatSlice'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'
import { CommonModal } from 'components/CommonModal/CommonModal'
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
  const [displayName, setDisplayName] = useState('')
  const currentConversation = useAppSelector(selectChat)
  const [openEditNameModal, setOpenEditNameModal] = useState(false)
  const { chatScreen } = useAppSelector(selectChatUI)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

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
      dispatch(
        createSnackBar({
          isOpen: true,
          horizontal: 'right',
          message: 'Successfully updated the chat name.',
          duration: 5000,
          severity: 'success',
        })
      )
      setOpenEditNameModal(false)
    } catch (error) {
      console.error(error)
      setOpenEditNameModal(false)
      setDisplayName('')
      dispatch(
        createSnackBar({
          isOpen: true,
          horizontal: 'right',
          message: "Couldn't update the chat name. Please try again later.",
          duration: 5000,
          severity: 'error',
        })
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
    if (currentConversation.chatType === 'group') {
      dispatch(onScreenUpdate(ChatScreen.EditChatRoom))
    }
  }

  const handleEditModal = () => {
    setOpenEditNameModal(true)
  }

  const profilePictures = extractConversationAvatars(
    currentConversation.participants,
    authUser._id
  )

  return (
    <div className='page-title'>
      <FiArrowLeft size={24} onClick={handleBackArrowClick} />
      {profilePictures.length > 0 && (
        <AvatarGrid
          pictures={profilePictures}
          avatarSize={'small'}
          avatarType={
            currentConversation.chatType === 'group' ? 'grid' : 'single'
          }
        />
      )}
      <div className='title-with-icon'>
        <h5 onClick={handleChangeScreen} className='group-link'>
          {getTitleText(chatScreen, currentConversation, authUser)}
        </h5>
      </div>
      {currentConversation.chatType === 'group' &&
        chatScreen === 'editChatRoom' && <BiPencil onClick={handleEditModal} />}
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
