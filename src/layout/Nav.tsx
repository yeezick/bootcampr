import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import { useSocketEvents } from 'components/Notifications/Socket'
import Avatar from 'components/Avatar/Avatar'
import {
  fetchThreads,
  selectChatUI,
  selectSortedThreads,
  selectUnreadMessageCount,
  setChatRoomActive,
  toggleChat,
  toggleChatClose,
} from 'utils/redux/slices/chatSlice'

import { AccountDropdown } from 'components/AccountDropdown.tsx/AccountDropdown'
import { buildPortal } from 'utils/helpers'
import { resetPortal } from 'utils/redux/slices/userInterfaceSlice'
import { CustomBadge } from 'components/Badge/Badge'
import './styles/Nav.scss'
import { selectMembers } from 'utils/redux/slices/projectSlice'

export const Nav = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<boolean | null>(null)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId, project: projectId } = authUser
  const dispatch = useAppDispatch()
  const location = useLocation()

  const closeDropdown = () => setAnchorEl(null)

  useEffect(() => {
    // Close chat dialog and sideMenu when URL path changes
    dispatch(toggleChatClose())
    dispatch(setChatRoomActive(false))
  }, [dispatch, location])

  const handlePortalLink = () => buildPortal(dispatch, 'project', projectId)
  const handleNonPortalLink = () => dispatch(resetPortal())

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          <Link to='/' onClick={handleNonPortalLink}>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
      </div>
      <div className='navbar-wrapper'>
        <div className='header-list'>
          <Link
            className='header-link'
            to={`/project/${projectId || 'unassigned'}`}
            onClick={handlePortalLink}
          >
            Project Portal
          </Link>
          <Link
            className='header-link'
            to='/how-to'
            onClick={handleNonPortalLink}
          >
            How Bootcamper works
          </Link>
          <Link
            className='header-link'
            to='/about-us'
            onClick={handleNonPortalLink}
          >
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
  const dispatch = useAppDispatch()
  const { visibleChat } = useAppSelector(selectChatUI)
  const unreadMessagesCount = useAppSelector(selectUnreadMessageCount)
  const projectMembers = useAppSelector(selectMembers)
  const chatRef = useRef(null)
  useSocketEvents(false)

  useEffect(() => {
    //Warning: needs to be checked if members are loaded
    dispatch(fetchThreads())
    dispatch(setChatRoomActive(false))
  }, [dispatch, projectMembers.length])

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
      <Link
        className='sign-up'
        to='/sign-up'
        target='_blank'
        rel='noopener noreferrer'
      >
        Sign up
      </Link>
    </div>
  </div>
)
