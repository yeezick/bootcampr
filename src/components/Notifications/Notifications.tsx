import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { emptyNotification } from '../../utilities/data/notificationConstants';
import { NotificationState } from '../../utilities/types/NotificationInterface';
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`;
const socket = io(ENDPOINT, { transports: ['websocket'] });

export const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationState>(emptyNotification);

  useEffect(() => {
    // const askUserPermission = async () => {
    //   return await Notification.requestPermission();
    // };
    // askUserPermission();

    // const handler = (notifications: string) => {
    //   setNotifications([...notifications, notifications]);
    // };

    socket.on('changes', () => {
      console.log(socket.connected);
    });
  }, []);

  console.log(notifications);

  return (
    <>
      <p>hi</p>
    </>
  );
};
