import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiArrowLeft } from 'react-icons/fi'
import { Conversations } from 'components/ChatDialog/Conversations/Conversations'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectConversation,
  selectSelectedMember,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'
import { Messages } from 'components/ChatDialog/Messages/Messages'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { NewChatRoom } from 'components/ChatDialog/NewChatRoom/NewChatRoom'
import { EditChatRoom } from 'components/ChatDialog/EditChatRoom/EditChatRoom'
import './ChatDialogMain.scss'
import { ChatMemberProfile } from 'components/ChatDialog/ChatMemberProfile/ChatMemberProfile'
import { AvatarGrid } from 'components/ChatDialog/AvatarGrid/AvatarGrid'
import { ChatScreen } from 'utils/data/chatConstants'
import { extractConversationAvatars } from 'utils/functions/chatLogic'

export const ChatDialogMain = () => {
  const dispatch = useAppDispatch()
  const [chatScreen, setChatScreen] = useState<ChatScreen>(ChatScreen.Main)
  const [chatScreenPath, setChatScreenPath] = useState<ChatScreen[]>([
    ChatScreen.Main,
  ])
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const selectedMember = useAppSelector(selectSelectedMember)
  const [chatRecipientId, setChatRecipientId] = useState('')
  const [profilePictures, setProfilePictures] = useState([])

  const onScreenUpdate = (screen: ChatScreen) => {
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
    onScreenUpdate(ChatScreen.Messages)
  }

  const handleComposeMessage = () => {
    onScreenUpdate(ChatScreen.ComposeNewChat)
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
      const groupPictures = extractConversationAvatars(
        currentConversation.participants,
        authUser._id
      )

      setProfilePictures(groupPictures)
    }
  }, [currentConversation, authUser])

  return (
    <div className='chat-dialog-container'>
      <section
        className={
          chatScreen === ChatScreen.Messages
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
  const titleContentLookup = {
    [ChatScreen.Main]: <h1 className='main-title'>Chats</h1>,
    [ChatScreen.Messages]: currentConversation.isGroup ? (
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
          onClick={() => onScreenUpdate(ChatScreen.EditChatRoom)}
          className='group-link'
        >
          {currentConversation.displayName}
        </h5>
      </div>
    ) : (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={onBackArrowClick} />
        <AvatarGrid
          pictures={selectedMember.profilePicture}
          avatarSize={'small'}
          chatType={'private'}
        />
        <h5
          onClick={() => onScreenUpdate(ChatScreen.MemberProfile)}
          className='group-link'
        >
          {currentConversation.selectedMember.firstName}{' '}
          {currentConversation.selectedMember.lastName}
        </h5>
      </div>
    ),
  }

  return (
    titleContentLookup[chatScreen] || (
      <div className='back-arrow'>
        <FiArrowLeft size={23} onClick={onBackArrowClick} />
        <h5>{getTitleText({ chatScreen, selectedMember })}</h5>
      </div>
    )
  )
}

const getTitleText = ({ chatScreen, selectedMember }) => {
  const titleTextLookup = {
    [ChatScreen.ComposeNewChat]: 'New Chat Room',
    [ChatScreen.EditChatRoom]: 'Edit Chat Room',
    [ChatScreen.InviteNewMembers]: 'Edit Chat Room',
    [ChatScreen.MemberProfile]: `${selectedMember.firstName}'s Profile`,
  }

  return titleTextLookup[chatScreen] || ''
}

const ChatHeaderActions = ({
  chatScreen,
  handleComposeMessage,
  closeChatBox,
}) => {
  return (
    <div className='main-icons'>
      {chatScreen === ChatScreen.Main && (
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
  const chatComponentLookup = {
    [ChatScreen.Main]: (
      <Conversations handleConversationClick={handleConversationClick} />
    ),
    [ChatScreen.Messages]: <Messages setChatRecipientId={setChatRecipientId} />,
    [ChatScreen.ComposeNewChat]: (
      <NewChatRoom chatScreen={chatScreen} onScreenUpdate={onScreenUpdate} />
    ),
    [ChatScreen.InviteNewMembers]: (
      <NewChatRoom chatScreen={chatScreen} onScreenUpdate={onScreenUpdate} />
    ),
    [ChatScreen.EditChatRoom]: <EditChatRoom onScreenUpdate={onScreenUpdate} />,
    [ChatScreen.MemberProfile]: <ChatMemberProfile />,
  }

  return chatComponentLookup[chatScreen] || null
}
