import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  logoutAuthUser,
  selectAuthUser,
  selectUserExperience,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import { useChatSocketEvents } from 'components/Socket/chatSocket'
import { Avatar } from 'components/Avatar/Avatar'
import {
  fetchThreads,
  selectChatUI,
  selectUnreadMessageCount,
  setActiveChatRoomId,
  toggleChat,
} from 'utils/redux/slices/chatSlice'
import { AccountDropdown } from 'components/AccountDropdown.tsx/AccountDropdown'
import { buildPortal } from 'utils/helpers'
import { resetPortal } from 'utils/redux/slices/userInterfaceSlice'
import { CustomBadge } from 'components/Badge/Badge'
import { selectMembersAsTeam } from 'utils/redux/slices/projectSlice'
import './styles/Nav.scss'
import { logOut } from 'utils/api'

export const Nav = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const authUser = useAppSelector(selectAuthUser)
  const experience = useAppSelector(selectUserExperience)
  const {
    _id: userId,
    projects: { activeProject },
  } = authUser
  const dispatch = useAppDispatch()
  const location = useLocation()
  const excludedRoutes = [
    '/payment',
    '/sign-up',
    '/sign-in',
    '/onboarding',
    '/mobile',
    '/users/reset-password',
    '/success',
  ]
  const isExcludedRoute = excludedRoutes.some(route =>
    location.pathname.startsWith(route)
  )
  const handlePortalLink = () =>
    buildPortal(dispatch, 'project', activeProject, experience)
  const handleNonPortalLink = async () => {
    if (window.location.pathname === '/users/reset-password') {
      await logOut()
      dispatch(logoutAuthUser())
    }
    dispatch(resetPortal())
  }
  const isActiveLink = path =>
    location.pathname.includes(path) ? 'active' : ''

  const landingPage =
    process.env.REACT_APP_API_ENV === 'local'
      ? '/'
      : 'https://landing.bootcampr.io/'

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          <Link to={landingPage} onClick={handleNonPortalLink}>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
      </div>
      {!isExcludedRoute && (
        <div className='navbar-wrapper'>
          <div className='header-list'>
            {userId && (
              <Link
                className={`header-link ${isActiveLink('project')}`}
                to={`/project/${activeProject || 'sandbox'}`}
                onClick={handlePortalLink}
              >
                Project Portal
              </Link>
            )}
            <a
              className={`header-link ${isActiveLink('contact-us')}`}
              href='https://landing.bootcampr.io/contactus'
              target='_blank'
            >
              Contact Us
            </a>
            <a
              className={`header-link ${isActiveLink('community')}`}
              href='https://landing.bootcampr.io/community'
              target='_blank'
            >
              Community
            </a>
            <a
              className={`header-link ${isActiveLink('enterprise')}`}
              href='https://landing.bootcampr.io/enterprise'
              target='_blank'
            >
              Enterprise
            </a>
          </div>
          {userId ? (
            <AuthorizedNavLinks
              notificationCount={notificationCount}
              setAnchorEl={setAnchorEl}
              anchorEl={anchorEl}
            />
          ) : (
            <UnauthorizedNavLinks />
          )}
        </div>
      )}
      <AccountDropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </nav>
  )
}

const AuthorizedNavLinks = ({ notificationCount, setAnchorEl, anchorEl }) => {
  const dispatch = useAppDispatch()
  const { visibleChat } = useAppSelector(selectChatUI)
  const unreadMessagesCount = useAppSelector(selectUnreadMessageCount)
  const projectMembers = useAppSelector(selectMembersAsTeam)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const chatRef = useRef(null)
  useChatSocketEvents(false)

  useEffect(() => {
    //Warning: needs to be checked if members are loaded
    dispatch(fetchThreads())
    dispatch(setActiveChatRoomId(null))
  }, [dispatch, projectMembers.length])

  const toggleChatBox = () => {
    dispatch(toggleChat())
  }

  const handleToggleChatBox = () => {
    toggleChatBox()
  }

  const handleClick = () => {
    const dropDownIcon = document.querySelector('.drop-down')
    setAnchorEl(dropDownIcon)
  }

  //TODO - chat icon position needs to be tested when we remove the unicorn landing page
  return (
    <div className='notifications'>
      {userId && (
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
          <p className='account' onClick={handleToggleChatBox}>
            Messages
          </p>
        </div>
      )}
      <div className='nav-icons-container' onClick={handleClick}>
        <div className='avatar'>
          <Avatar />
        </div>
        <p className='account'>My Account</p>
        <MdArrowDropDown
          size={33}
          className={`drop-down ${anchorEl ? 'open' : ''}`}
        />
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
