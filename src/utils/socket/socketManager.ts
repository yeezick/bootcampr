import io from 'socket.io-client'
import { api } from 'utils/api'

const ENDPOINT = api.getUri()
const sockets = {}

export const connectSocket = (namespace, userId) => {
  if (!sockets[namespace]) {
    const socket = io(`${ENDPOINT}/${namespace}`, {
      query: { userId },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    })
    socket.on('connect', () => {
      socket.emit('setUserId', userId)
    })
    socket.on('disconnect', () => {
      delete sockets[namespace]
    })

    sockets[namespace] = socket
    return socket
  }
  return sockets[namespace]
}

export const disconnectSocket = namespace => {
  const socket = sockets[namespace]
  if (socket) {
    socket.disconnect()
    delete sockets[namespace]
  }
}

export const emitEvent = (namespace, event, data, userId) => {
  let socket = sockets[namespace]
  if (!socket) {
    console.error(
      `Socket for ${namespace} was not connected. Attempting to reconnect...`
    )
    socket = connectSocket(namespace, userId)
  }

  const emitData = () => {
    if (socket && socket.connected) {
      socket.emit(event, data)
    } else {
      socket.on('connect', () => {
        socket.emit(event, data)
      })
    }
  }

  emitData()
}
