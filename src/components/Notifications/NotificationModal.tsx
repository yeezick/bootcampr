import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getNotifications, updateStatusNotification, deleteNotification } from '../../utilities/api/users';
import { emptyNotification } from '../../utilities/data/notificationConstants';
import { NotificationState } from '../../utilities/types/NotificationInterface';
import { NotificationsInterface } from '../../utilities/types/UserInterface';

export const NotificationModal = () => {
  const params = useParams();
  const [notifications, setNotifications] = useState<NotificationState[]>();

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
        {notifications?.map((notification) => {
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
