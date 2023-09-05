import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getUserProfileImage,
  selectAuthUser,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import { useSocket } from 'components/Notifications/Socket'
import Avatar from 'components/Avatar/Avatar'
import './Nav.scss'
import {
  selectChatUI,
  toggleChat,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'
import { ChatIconBadge } from 'components/ChatDialog/ChatIconBadge/ChatIconBadge'
import { AccountDropdown } from 'components/AccountDropdown.tsx/AccountDropdown'
import {
  closeProjectPortal,
  renderProjectPortal,
} from 'utils/redux/slices/projectSlice'

export const Nav = () => {
  const [colored, setColored] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<boolean | null>(null)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const dispatch = useAppDispatch()
  const socketConnection = useSocket()
  const location = useLocation()
  const closeDropdown = () => setAnchorEl(null)
  const projectPortalHandler = () => dispatch(renderProjectPortal())

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
    dispatch(closeProjectPortal())
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
          {userId && (
            <div className='header-link' onClick={projectPortalHandler}>
              Project portal
            </div>
          )}
          <Link className='header-link' to='/how-to'>
            How Bootcamper works
          </Link>
          <Link className='header-link' to='/about-us'>
            About us
          </Link>
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
  const [isChatBadgeUpdated, setIsChatBadgeUpdated] = useState(false)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const { visibleChat } = useAppSelector(selectChatUI)
  const chatRef = useRef(null)
  const dispatch = useAppDispatch()
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
          {(visibleChat || !visibleChat) && (
            <ChatIconBadge
              isChatBadgeUpdated={isChatBadgeUpdated}
              setIsChatBadgeUpdated={setIsChatBadgeUpdated}
            />
          )}
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
