import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiArrowLeft } from 'react-icons/fi'
import { Conversations } from 'components/ChatDialog/Conversations/Conversations'
import {
  selectAuthUser,
  selectConversation,
  selectSelectedMember,
  toggleChatClose,
} from 'utils/redux/slices/userSlice'
import { Messages } from 'components/ChatDialog/Messages/Messages'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { NewChatRoom } from 'components/ChatDialog/NewChatRoom/NewChatRoom'
import { EditChatRoom } from 'components/ChatDialog/EditChatRoom/EditChatRoom'
import './ChatDialogMain.scss'
import { ChatMemberProfile } from '../ChatMemberProfile/ChatMemberProfile'
import { AvatarGrid } from '../AvatarGrid/AvatarGrid'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const [chatScreen, setChatScreen] = useState<string>('main')
  const [chatScreenPath, setChatScreenPath] = useState<string[]>(['main'])
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const selectedMember = useAppSelector(selectSelectedMember)
  const [chatRecipientId, setChatRecipientId] = useState('')
  const [profilePictures, setProfilePictures] = useState([])

  const updateChatScreen = screen => {
    setChatScreenPath(prevPath => [...prevPath, screen])
    setChatScreen(screen)
  }

  const handleBackArrow = () => {
    if (chatScreenPath.length > 1) {
      const updatedPath = chatScreenPath.slice(0, -1)
      setChatScreenPath(updatedPath)
      setChatScreen(updatedPath[updatedPath.length - 1])
    }
  }

  const handleConversationClick = () => {
    updateChatScreen('messages')
  }

  const handleComposeMessage = () => {
    updateChatScreen('composeNewChat')
  }

  const closeChatBox = () => {
    dispatch(toggleChatClose())
  }

  useEffect(() => {
    if (
      currentConversation &&
      currentConversation.participants &&
      Array.isArray(currentConversation.participants)
    ) {
      const groupPictures = (currentConversation.participants as Array<any>)
        .filter(
          ({ participant }) => participant && participant._id !== authUser._id
        )
        .map(({ participant }) => participant.profilePicture)

      setProfilePictures(groupPictures)
    }
  }, [currentConversation, authUser])

  return (
    <div className='chat-dialog-container'>
      <section
        className={
          chatScreen === 'messages'
            ? 'chat-header-messages'
            : 'chat-header-main'
        }
      >
        <ChatTitle
          chatScreen={chatScreen}
          handleBackArrow={handleBackArrow}
          updateChatScreen={updateChatScreen}
          currentConversation={currentConversation}
          selectedMember={selectedMember}
          profilePictures={profilePictures}
        />
        <ChatHeaderActions
          chatScreen={chatScreen}
          handleComposeMessage={handleComposeMessage}
          closeChatBox={closeChatBox}
        />
      </section>
      <section className='chat-body'>
        <ChatBody
          chatScreen={chatScreen}
          handleConversationClick={handleConversationClick}
          updateChatScreen={updateChatScreen}
          setChatRecipientId={setChatRecipientId}
        />
      </section>
    </div>
  )
}

const ChatTitle = ({
  chatScreen,
  handleBackArrow,
  updateChatScreen,
  currentConversation,
  selectedMember,
  profilePictures,
}) => {
  if (chatScreen === 'main') {
    return <h1> Chats</h1>
  }

  if (chatScreen === 'composeNewChat') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h5>New Chat Room</h5>
      </div>
    )
  }

  if (chatScreen === 'editChatRoom') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h5>Edit Chat Room</h5>
      </div>
    )
  }

  if (chatScreen === 'inviteNewMembers') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h5>Edit Chat Room</h5>
      </div>
    )
  }

  if (chatScreen === 'memberProfile') {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <h5>{selectedMember.firstName}'s Profile</h5>
      </div>
    )
  }

  if (chatScreen === 'messages' && currentConversation.isGroup) {
    return (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        {profilePictures.length > 0 && (
          <AvatarGrid
            picturesArray={profilePictures}
            avatarSize={'small'}
            chatType={'group'}
          />
        )}
        <h5
          onClick={() => updateChatScreen('editChatRoom')}
          className='group-link'
        >
          {currentConversation.displayName}
        </h5>
      </div>
    )
  }

  if (chatScreen === 'messages' && !currentConversation.isGroup) {
    const handleRecipientNameClick = () => {
      updateChatScreen('memberProfile')
    }

    return (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={handleBackArrow} />
        <AvatarGrid
          picturesArray={selectedMember.profilePicture}
          avatarSize={'small'}
          chatType={'private'}
        />
        <h5 onClick={handleRecipientNameClick} className='group-link'>
          {currentConversation.selectedMember.firstName}{' '}
          {currentConversation.selectedMember.lastName}
        </h5>
      </div>
    )
  }
}

const ChatHeaderActions = ({
  chatScreen,
  handleComposeMessage,
  closeChatBox,
}) => {
  if (chatScreen === 'main') {
    return (
      <div className='main-icons'>
        <HiOutlinePencilAlt size={22} onClick={handleComposeMessage} />
        <IoMdClose size={22} onClick={closeChatBox} />
      </div>
    )
  } else
    return (
      <div className='main-icons'>
        <IoMdClose size={22} onClick={closeChatBox} />
      </div>
    )
}

const ChatBody = ({
  chatScreen,
  handleConversationClick,
  setChatRecipientId,
  updateChatScreen,
}) => {
  if (chatScreen === 'main') {
    return <Conversations handleConversationClick={handleConversationClick} />
  }

  if (chatScreen === 'messages') {
    return <Messages setChatRecipientId={setChatRecipientId} />
  }

  if (chatScreen === 'composeNewChat') {
    return (
      <NewChatRoom
        chatScreen={chatScreen}
        updateChatScreen={updateChatScreen}
      />
    )
  }

  if (chatScreen === 'editChatRoom') {
    return <EditChatRoom updateChatScreen={updateChatScreen} />
  }

  if (chatScreen === 'inviteNewMembers') {
    return (
      <NewChatRoom
        chatScreen={chatScreen}
        updateChatScreen={updateChatScreen}
      />
    )
  }

  if (chatScreen === 'memberProfile') {
    return <ChatMemberProfile />
  }
}
