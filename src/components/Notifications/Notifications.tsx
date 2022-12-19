import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useNotification } from '../../utilities/redux/hooks';
import { RootState } from '../../utilities/redux/store';
import { getNotifications, updateStatusNotification, deleteNotification } from '../../utilities/api/users';
import { NotificationsInterface } from '../../utilities/types/UserInterface';
import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material';

export const Notifications = () => {
  const params = useParams();
  const [notifications, setNotifications] = useState<NotificationsInterface[]>([]);
  const userNotifications = useAppSelector((state: RootState) => state.notification);
  const { clearNotification } = useNotification();

  useEffect(() => {
    const fetchNotifications = async () => {
      const displayNotifications = await getNotifications();
      setNotifications(displayNotifications);
    };
    fetchNotifications();
  }, [setNotifications]);

  const handleStatus = async () => {
    const updateStatus = await updateStatusNotification(params.id);
  };

  return (
    <div>
      <ul>
        {notifications.map((notification) => {
          return (
            <li key={notification._id}>
              <h3>{notification.notification}</h3>
              <p>{notification.message}</p>
              <button>Mark as Read</button>
              <button>Delete Notification</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
