import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`;
const socket = io(ENDPOINT, { transports: ['websocket'] });

interface ISocket {
  name?: string;
  on?: any;
  emit?: any;
  off?: any;
}

export const Socket = () => {
  const [socketConnection, setSocketConnection] = useState<ISocket | any>();

  useEffect(() => {
    const askUserPermission = async () => {
      return await Notification.requestPermission();
    };
    askUserPermission();

    const connection = socket.on('connection', () => {
      return socket.connected;
    });
    setSocketConnection(connection);
  }, []);

  return { socketConnection };
};
