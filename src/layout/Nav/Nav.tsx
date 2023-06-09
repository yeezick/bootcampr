import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  selectAuthUser,
  toggleChatClose,
  toggleSidebar,
  toggleSidebarClose,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { MdArrowDropDown } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import Logo from 'assets/Logo.svg'
import { NotificationModal } from 'components/Notifications/NotificationModal'
import { ChatDialogMain } from 'components/ChatDialog/ChatDialogMain/ChatDialogMain'
import { Socket } from 'components/Notifications/Socket'
import Avatar from 'components/Avatar/Avatar'
import './Nav.scss'
import {
  chatStatus,
  getUserProfileImage,
  toggleChat,
} from 'utils/redux/slices/userSlice'
import ProfilePreviewImage from 'screens/ProfilePreviewImage/ProfilePreviewImage'

export const Nav = () => {
  const [colored, setColored] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const reduxUploadedImage = useSelector(getUserProfileImage)
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const dispatch = useAppDispatch()
  const { socketConnection } = Socket()
  const visibleChat = useAppSelector(chatStatus)
  const chatRef = useRef(null)
  const location = useLocation()

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

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar())
  }

  const toggleChatBox = () => {
    dispatch(toggleChat())
  }

  const ChangeNavbarColor = () => {
    window.scrollY >= 100 ? setColored(true) : setColored(false)
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  window.addEventListener('scroll', ChangeNavbarColor)

  return (
    <nav
      className={
        location.pathname === '/' ? (colored ? 'navbar-colored' : 'navbar') : ''
      }
    >
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

      {userId && (
        <div className='notifications'>
          <div className='messages-icon' ref={chatRef}>
            <BsFillChatLeftTextFill
              size={23}
              className='chat-icon'
              onClick={() => toggleChatBox()}
            />
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
          <Avatar openModal={openModal} />
          <Link className='link' to='/'>
            <MdArrowDropDown size={25} />
          </Link>
        </div>
      )}

      {!userId && (
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
      )}
      <ProfilePreviewImage
        open={isModalOpen}
        onClose={closeModal}
        uploadedImage={reduxUploadedImage}
      />
    </nav>
  )
}
