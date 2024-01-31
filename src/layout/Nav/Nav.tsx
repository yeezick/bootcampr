import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import Avatar from 'components/Avatar/Avatar'
import {
  selectChat,
  selectChatUI,
  selectIsChatRoomActive,
  selectThreads,
  selectUnreadMessages,
  setChatRoomActive,
  setUnreadChatsCount,
  toggleChat,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'
import { ChatIconBadge } from 'components/ChatDialog/ChatIconBadge/ChatIconBadge'
import { AccountDropdown } from 'components/AccountDropdown.tsx/AccountDropdown'
import './Nav.scss'
import { DomainLink } from 'layout/DomainLink'
import { getUnreadChatMessageCount } from 'utils/api/chat'
import { CustomBadge } from 'components/Badge/Badge'
import { useSocket, useSocketEvents } from 'components/Notifications/Socket'

export const Nav = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [isChatBadgeUpdated, setIsChatBadgeUpdated] = useState(false)
  const [anchorEl, setAnchorEl] = useState<boolean | null>(null)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId, project: projectId } = authUser
  const dispatch = useAppDispatch()
  const location = useLocation()
  const socket = useSocket(authUser._id)
  const closeDropdown = () => setAnchorEl(null)
  const currentConversation = useAppSelector(selectChat)
  console.log(currentConversation)

  useEffect(() => {
    // Close chat dialog and sideMenu when URL path changes
    dispatch(toggleChatClose())
    dispatch(setChatRoomActive(false))
  }, [dispatch, location])

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
      </div>
      <div className='navbar-wrapper'>
        <div className='header-list'>
          {projectId && (
            <DomainLink
              className='header-link'
              route={`/project/${projectId}`}
              domain={'project'}
            >
              Project Portal
            </DomainLink>
          )}
        </div>
        {userId ? (
          <AuthorizedNavLinks
            notificationCount={notificationCount}
            setAnchorEl={setAnchorEl}
          />
        ) : (
          <UnauthorizedNavLinks />
        )}
      </div>
      <AccountDropdown anchorEl={anchorEl} closeDropdown={closeDropdown} />
    </nav>
  )
}

const AuthorizedNavLinks = ({ notificationCount, setAnchorEl }) => {
  const dispatch = useAppDispatch()
  const unreadMessagesCount = useAppSelector(selectUnreadMessages)
  const { visibleChat } = useAppSelector(selectChatUI)
  const chatRef = useRef(null)
  useSocketEvents(false)
  const isChatRoomActive = useAppSelector(selectIsChatRoomActive)
  console.log(isChatRoomActive)
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const unreadMessages = await getUnreadChatMessageCount()
      dispatch(setUnreadChatsCount(unreadMessages.count))
    }
    fetchUnreadCount()
    dispatch(setChatRoomActive(false))
  }, [dispatch])

  const toggleChatBox = () => {
    dispatch(toggleChat())
  }
  const handleToggleChatBox = () => {
    toggleChatBox()
  }

  return (
    <div className='notifications'>
      <div className='nav-icons-container'>
        <div className='messages-icon' ref={chatRef}>
          <BsFillChatLeftTextFill
            size={23}
            className='chat-icon'
            onClick={handleToggleChatBox}
          />

          <CustomBadge content={unreadMessagesCount} variant='standard' />

          {visibleChat && <ChatDialogMain />}
        </div>
        <p className='account'>Messages</p>
      </div>
      <div className='nav-icons-container'>
        <div className='account avatar'>
          <Avatar clickable={false} setAnchorEl={setAnchorEl} />
        </div>
        <div onClick={setAnchorEl}>
          <p className='account'>My Account </p>
          <MdArrowDropDown size={33} className='drop-down' />
        </div>
      </div>
    </div>
  )
}
const UnauthorizedNavLinks = () => (
  <div className='auth-btn'>
    <div>
      <Link className='log-in' to='/sign-in'>
        Log in
      </Link>
    </div>
    <div>
      <Link className='sign-up' to='/sign-up'>
        Sign up
      </Link>
    </div>
  </div>
)
