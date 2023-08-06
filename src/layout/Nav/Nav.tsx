import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getUserProfileImage,
  selectAuthUser,
  toggleSidebar,
  toggleSidebarClose,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { NotificationModal } from 'components/Notifications/NotificationModal'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import { useSocket } from 'components/Notifications/Socket'
import Avatar from 'components/Avatar/Avatar'
import './Nav.scss'
import {
  chatStatus,
  toggleChat,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'
import { ChatIconBadge } from 'components/ChatDialog/ChatIconBadge/ChatIconBadge'
import { AccountDropdown } from 'components/AccountDropdown.tsx/AccountDropdown'

export const Nav = () => {
  const [colored, setColored] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isChatBadgeUpdated, setIsChatBadgeUpdated] = useState(false)
  const reduxUploadedImage = useAppSelector(getUserProfileImage)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const dispatch = useAppDispatch()
  const socketConnection = useSocket()
  const visibleChat = useAppSelector(chatStatus)
  const chatRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<boolean | null>(null)
  const location = useLocation()
  const closeDropdown = () => setAnchorEl(null)
  const toggleSidebarHandler = () => dispatch(toggleSidebar())
  const ChangeNavbarColor = () =>
    window.scrollY >= 100 ? setColored(true) : setColored(false)
  window.addEventListener('scroll', ChangeNavbarColor)
  const navClassName =
    location.pathname === '/' ? (colored ? 'navbar-colored' : 'navbar') : ''

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('setUserId', authUser._id)

      socketConnection?.on('connect', () => {
        socketConnection.emit('setUserId', authUser._id)
      })
      const timer = setInterval(() => {
        socketConnection?.on('notificationsLength', (data: number) => {
          setNotificationCount(data)
        })
      }, 10000)
      return () => {
        socketConnection?.off('connect')
        socketConnection?.off('disconnect')
        clearTimeout(timer)
      }
    }
    socketConnection?.on('disconnect', () => {
      socketConnection.emit('User has disconnected')
    })
  }, [setNotificationCount, authUser, socketConnection])

  useEffect(() => {
    // Close chat dialog and sidebar when URL path changes
    dispatch(toggleChatClose())
    dispatch(toggleSidebarClose())
  }, [dispatch, location])

  return (
    <nav className={navClassName}>
      <div className='navbar-wrapper'>
        <div className='nav-container'>
          {userId !== '' ? (
            <div className='menu-btn' onClick={toggleSidebarHandler}>
              <i></i>
              <i></i>
              <i></i>
            </div>
          ) : null}
          <div className='logo'>
            <Link to='/'>
              <img src={Logo} alt='logo' />
            </Link>
          </div>
        </div>
        <div>
          <Link className='link' to='/project-portal'>
            Project Portal
          </Link>
          <Link className='link' to='/how-to'>
            How Bootcamper works
          </Link>
          <Link className='link' to='/about-us'>
            About us
          </Link>
        </div>
        {userId ? (
          <AuthorizedNavLinks
            notificationCount={notificationCount}
            setAnchorEl={setAnchorEl}
            isChatBadgeUpdated={isChatBadgeUpdated}
            setIsChatBadgeUpdated={setIsChatBadgeUpdated}
          />
        ) : (
          <UnauthorizedNavLinks />
        )}
      </div>
      <AccountDropdown anchorEl={anchorEl} closeDropdown={closeDropdown} />
    </nav>
  )
}

const AuthorizedNavLinks = ({
  notificationCount,
  setAnchorEl,
  isChatBadgeUpdated,
  setIsChatBadgeUpdated,
}) => {
  const visibleChat = useAppSelector(chatStatus)
  const chatRef = useRef(null)
  const dispatch = useAppDispatch()
  const toggleChatBox = () => {
    dispatch(toggleChat())
  }

  return (
    <div className='notifications'>
      <div className='messages-icon' ref={chatRef}>
        <BsFillChatLeftTextFill
          size={23}
          className='chat-icon'
          onClick={() => toggleChatBox()}
        />
        {(visibleChat || !visibleChat) && (
          <ChatIconBadge
            isChatBadgeUpdated={isChatBadgeUpdated}
            setIsChatBadgeUpdated={setIsChatBadgeUpdated}
          />
        )}
        {visibleChat && <ChatDialogMain />}
      </div>
      <div className='notification-badge link'>
        <NotificationModal />
      </div>
      {notificationCount > 0 && (
        <div className='notification-count'>
          <span>{notificationCount}</span>
        </div>
      )}
      <Avatar clickable={false} setAnchorEl={setAnchorEl} />
      <MdArrowDropDown size={25} />
    </div>
  )
}
const UnauthorizedNavLinks = () => (
  <div className='auth-btn'>
    <div>
      <Link className='link sign-up' to='/sign-up'>
        Sign up
      </Link>
    </div>

    <div>
      <Link className='link log-in' to='/sign-in'>
        Log in
      </Link>
    </div>
  </div>
)
