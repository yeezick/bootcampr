import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import {
  fetchAndStoreUserProject,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import { logOut } from 'utils/api'
import './styles/Nav.scss'
import { SecondaryButton } from 'components/Buttons'
import { useSocket } from 'utils/socket/useSocket'

export const Nav = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const authUser = useAppSelector(selectAuthUser)
  const experience = useAppSelector(selectUserExperience)
  const currentProjectId = useAppSelector(selectProjectId)
  const { _id: userId, payment } = authUser
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
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
  const isOnboardingRoute =
    location.pathname === '/onboarding' && experience === 'waitlist'
  const handleNavToPortal = () => {
    if (experience === 'waitlist' && !payment.paid) {
      dispatch(fetchAndStoreUserProject('sandbox'))
      navigate(`/project/sandbox`)
    } else {
      navigate(`/project/${currentProjectId}`)
    }
  }
  const handlePortalLink = () =>
    buildPortal(dispatch, 'project', currentProjectId, experience)
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
      : 'https://landing.collabify.ai/'

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
                to={`/project/${currentProjectId}`}
                onClick={handlePortalLink}
              >
                Project Portal
              </Link>
            )}
            <a
              className={`header-link ${isActiveLink('contact-us')}`}
              href='https://landing.collabify.ai/contactus'
              target='_blank'
            >
              Contact Us
            </a>
            <a
              className={`header-link ${isActiveLink('community')}`}
              href='https://landing.collabify.ai/community'
              target='_blank'
            >
              Community
            </a>
            <a
              className={`header-link ${isActiveLink('enterprise')}`}
              href='https://landing.collabify.ai/enterprise'
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
      {isOnboardingRoute && (
        <div className='navbar-wrapper'>
          <SecondaryButton label='Go to sandbox' onClick={handleNavToPortal} />
        </div>
      )}
      <AccountDropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </nav>
  )
}

const AuthorizedNavLinks = ({ notificationCount, setAnchorEl, anchorEl }) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const { visibleChat } = useAppSelector(selectChatUI)
  const unreadMessagesCount = useAppSelector(selectUnreadMessageCount)
  const { _id: userId } = authUser
  const chatRef = useRef(null)
  useChatSocketEvents(false)
  useSocket('kanban', userId)
  useSocket('comment', userId)

  useEffect(() => {
    dispatch(fetchThreads())
    dispatch(setActiveChatRoomId(null))
  }, [dispatch])

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
        <NavChatContainer
          chatRef={chatRef}
          handleToggleChatBox={handleToggleChatBox}
          unreadMessagesCount={unreadMessagesCount}
          visibleChat={visibleChat}
        />
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

const NavChatContainer = ({
  chatRef,
  handleToggleChatBox,
  unreadMessagesCount,
  visibleChat,
}) => {
  return (
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
  )
}
