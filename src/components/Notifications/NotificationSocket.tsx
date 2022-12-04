import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`;
const socket = io(ENDPOINT);

export const NotificationSocket = () => {
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    const handler = async (notifications: any) => {
      setNotifications([...notifications, notifications]);
    };

    socket.on('changes', handler);
  }, [notifications]);

  useEffect(() => {
    const handler = (notifications: any) => {
      setNotifications((notifications: any) => [...notifications, notifications]);
    };

    socket.on('changes', handler);
  }, []);

  console.log(notifications);

  return <div>NotificationSocket</div>;
};
