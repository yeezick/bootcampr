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

  const onScreenUpdate = screen => {
    setChatScreenPath(prevPath => [...prevPath, screen])
    setChatScreen(screen)
  }

  const onBackArrowClick = () => {
    if (chatScreenPath.length > 1) {
      const updatedPath = chatScreenPath.slice(0, -1)
      setChatScreenPath(updatedPath)
      setChatScreen(updatedPath[updatedPath.length - 1])
    }
  }

  const handleConversationClick = () => {
    onScreenUpdate('messages')
  }

  const handleComposeMessage = () => {
    onScreenUpdate('composeNewChat')
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
          onBackArrowClick={onBackArrowClick}
          onScreenUpdate={onScreenUpdate}
          currentConversation={currentConversation}
          selectedMember={selectedMember}
          profilePictures={profilePictures}
          getTitleText={getTitleText}
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
          onScreenUpdate={onScreenUpdate}
          setChatRecipientId={setChatRecipientId}
        />
      </section>
    </div>
  )
}

const ChatTitle = ({
  chatScreen,
  onBackArrowClick,
  onScreenUpdate,
  currentConversation,
  selectedMember,
  profilePictures,
  getTitleText,
}) => {
  if (chatScreen === 'main') {
    return <h1> Chats</h1>
  } else if (chatScreen === 'messages' && currentConversation.isGroup) {
    return (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={onBackArrowClick} />
        {profilePictures.length > 0 && (
          <AvatarGrid
            pictures={profilePictures}
            avatarSize={'small'}
            chatType={'group'}
          />
        )}
        <h5
          onClick={() => onScreenUpdate('editChatRoom')}
          className='group-link'
        >
          {currentConversation.displayName}
        </h5>
      </div>
    )
  } else if (chatScreen === 'messages' && !currentConversation.isGroup) {
    const handleRecipientNameClick = () => {
      onScreenUpdate('memberProfile')
    }

    return (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={onBackArrowClick} />
        <AvatarGrid
          pictures={selectedMember.profilePicture}
          avatarSize={'small'}
          chatType={'private'}
        />
        <h5 onClick={handleRecipientNameClick} className='group-link'>
          {currentConversation.selectedMember.firstName}{' '}
          {currentConversation.selectedMember.lastName}
        </h5>
      </div>
    )
  } else {
    return (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={onBackArrowClick} />
        <h5>{getTitleText({ chatScreen, selectedMember })}</h5>
      </div>
    )
  }
}

const getTitleText = ({ chatScreen, selectedMember }) => {
  switch (chatScreen) {
    case 'composeNewChat':
      return 'New Chat Room'
    case 'editChatRoom':
      return 'Edit Chat Room'
    case 'inviteNewMembers':
      return 'Edit Chat Room'
    case 'memberProfile':
      return `${selectedMember.firstName}'s Profile`
    default:
      return ''
  }
}

const ChatHeaderActions = ({
  chatScreen,
  handleComposeMessage,
  closeChatBox,
}) => {
  return (
    <div className='main-icons'>
      {chatScreen === 'main' && (
        <HiOutlinePencilAlt size={22} onClick={handleComposeMessage} />
      )}
      <IoMdClose size={22} onClick={closeChatBox} />
    </div>
  )
}

const ChatBody = ({
  chatScreen,
  handleConversationClick,
  setChatRecipientId,
  onScreenUpdate,
}) => {
  if (chatScreen === 'main') {
    return <Conversations handleConversationClick={handleConversationClick} />
  }

  if (chatScreen === 'messages') {
    return <Messages setChatRecipientId={setChatRecipientId} />
  }

  if (chatScreen === 'composeNewChat') {
    return (
      <NewChatRoom chatScreen={chatScreen} onScreenUpdate={onScreenUpdate} />
    )
  }

  if (chatScreen === 'editChatRoom') {
    return <EditChatRoom onScreenUpdate={onScreenUpdate} />
  }

  if (chatScreen === 'inviteNewMembers') {
    return (
      <NewChatRoom chatScreen={chatScreen} onScreenUpdate={onScreenUpdate} />
    )
  }

  if (chatScreen === 'memberProfile') {
    return <ChatMemberProfile />
  }
}
