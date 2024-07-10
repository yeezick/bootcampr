import { useEffect } from 'react'
import { useAppDispatch } from 'utils/redux/hooks'

export const useSocket = (
  namespace,
  userId,
  connectType = 'CONNECT_SOCKET',
  disconnectType = 'DISCONNECT_SOCKET'
) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: connectType,
      payload: { namespace, userId },
    })

    return () => {
      dispatch({
        type: disconnectType,
        payload: { namespace },
      })
    }
  }, [dispatch, namespace, userId, connectType, disconnectType])

  return null
}
