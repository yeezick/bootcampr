import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { FiArrowLeft } from 'react-icons/fi'
import { Conversations } from 'components/ChatDialog/Conversations/Conversations'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  onBackArrowClick,
  onScreenUpdate,
  selectChatUI,
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
  const { chatScreen } = useAppSelector(selectChatUI)
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const selectedMember = useAppSelector(selectSelectedMember)
  const [chatRecipientId, setChatRecipientId] = useState('')
  const [profilePictures, setProfilePictures] = useState([])

  const updateScreen = (screen: ChatScreen) => {
    dispatch(onScreenUpdate(screen))
  }

  const handleBackArrowClick = () => {
    dispatch(onBackArrowClick())
  }

  const handleConversationClick = () => {
    updateScreen(ChatScreen.Messages)
  }

  const handleComposeMessage = () => {
    updateScreen(ChatScreen.ComposeNewChat)
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
          handleBackArrowClick={handleBackArrowClick}
          updateScreen={updateScreen}
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
          setChatRecipientId={setChatRecipientId}
        />
      </section>
    </div>
  )
}

const ChatTitle = ({
  chatScreen,
  handleBackArrowClick,
  updateScreen,
  currentConversation,
  selectedMember,
  profilePictures,
  getTitleText,
}) => {
  const titleContentLookup = {
    [ChatScreen.Main]: <h1 className='main-title'>Chats</h1>,
    [ChatScreen.Messages]: currentConversation.isGroup ? (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={handleBackArrowClick} />
        {profilePictures.length > 0 && (
          <AvatarGrid
            pictures={profilePictures}
            avatarSize={'small'}
            chatType={'group'}
          />
        )}
        <h5
          onClick={() => updateScreen(ChatScreen.EditChatRoom)}
          className='group-link'
        >
          {currentConversation.displayName}
        </h5>
      </div>
    ) : (
      <div className='back-arrow messages'>
        <FiArrowLeft size={23} onClick={handleBackArrowClick} />
        <AvatarGrid
          pictures={selectedMember.profilePicture}
          avatarSize={'small'}
          chatType={'private'}
        />
        <h5
          onClick={() => updateScreen(ChatScreen.MemberProfile)}
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
        <FiArrowLeft size={23} onClick={handleBackArrowClick} />
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
    <div
      className={`main-icons ${chatScreen === ChatScreen.Main ? 'home' : ''}`}
    >
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
}) => {
  const chatComponentLookup = {
    [ChatScreen.Main]: (
      <Conversations handleConversationClick={handleConversationClick} />
    ),
    [ChatScreen.Messages]: <Messages setChatRecipientId={setChatRecipientId} />,
    [ChatScreen.ComposeNewChat]: <NewChatRoom chatScreen={chatScreen} />,
    [ChatScreen.InviteNewMembers]: <NewChatRoom chatScreen={chatScreen} />,
    [ChatScreen.EditChatRoom]: <EditChatRoom />,
    [ChatScreen.MemberProfile]: <ChatMemberProfile />,
  }

  return chatComponentLookup[chatScreen] || null
}
