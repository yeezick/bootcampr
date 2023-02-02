import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { toggleSidebar } from '../../utilities/redux/slices/users/userSlice';
import { MdArrowDropDown } from 'react-icons/md';
import Logo from '../../assets/Logo.svg';
import { NotificationModal } from '../../components/Notifications/NotificationModal';
import { Socket } from '../../components/Notifications/Socket';
import './Nav.scss';

export const Nav = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const authUser = useAppSelector(selectAuthUser);
  const { _id: userId } = authUser;
  const dispatch = useAppDispatch();
  const { socketConnection } = Socket();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('setUserId', authUser._id);

      socketConnection?.on('connect', () => {
        socketConnection.emit('setUserId', authUser._id);
      });
      const timer = setInterval(() => {
        socketConnection?.on('notificationsLength', (data: number) => {
          setNotificationCount(data);
        });
      }, 10000);
      return () => {
        socketConnection?.off('connect');
        socketConnection?.off('disconnect');
        clearTimeout(timer);
      };
    }
    socketConnection?.on('disconnect', () => {
      socketConnection.emit('User has disconnected');
    });
  }, [setNotificationCount, authUser]);

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav>
      <div className="nav-container">
        {userId !== '' ? (
          <div className="menu-btn" onClick={toggleSidebarHandler}>
            <i></i>
            <i></i>
            <i></i>
          </div>
        ) : null}
        <div className="logo">
          <img src={Logo} />
        </div>
      </div>
      <div className="nav-links">
        <div>
          <Link className="link" to="/">
            Landing Page
          </Link>
        </div>
        <div>
          <Link className="link" to="/projects">
            Browse Projects
          </Link>
        </div>
        <div>
          <Link className="link" to="/projects/create">
            Create Project
          </Link>
        </div>
      </div>
      {userId !== '' ? (
        <div className="notifications">
          <div className="notification-badge link">
            <NotificationModal />
          </div>
          {notificationCount > 0 && (
            <div className="notification-count">
              <span>{notificationCount}</span>
            </div>
          )}
          <div className="image"></div>
          <Link className="link" to="/">
            <MdArrowDropDown size={25} />
          </Link>
        </div>
      ) : null}

      {userId !== '' ? null : (
        <div className="auth-btn">
          <div>
            <Link className="link sign-up" to="/sign-up">
              Sign up
            </Link>
          </div>

          <div>
            <Link className="link log-in" to="/sign-in">
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
