import { useState, useEffect } from 'react'
import { Socket as SocketIOClient, io } from 'socket.io-client'
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`
console.log(ENDPOINT)

export const useSocket = () => {
  const [socket, setSocket] = useState<SocketIOClient | null>(null)

  useEffect(() => {
    // Todo: this breaks jest test, is it necessary at all?
    // todo: may potentially be obsolete once we move away from chrome alerts
    // const askUserPermission = async () => {
    //   return await Notification.requestPermission()
    // }
    // askUserPermission()

    setSocket(io(ENDPOINT, { transports: ['websocket'] }))
  }, [])

  return socket
}
