import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`;
const socket = io(ENDPOINT, { transports: ['websocket'] });

export const Socket = () => {
  const [socketConnection, setSocketConnection] = useState<any>();

  useEffect(() => {
    const askUserPermission = async () => {
      return await Notification.requestPermission();
    };
    askUserPermission();

    const connection = socket.on('connection', () => {
      console.log(socket.connected);
    });
    setSocketConnection(connection);
  }, []);

  return { socketConnection };
};
