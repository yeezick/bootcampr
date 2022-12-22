import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from './slices/users/notificationSlice';
import { AppDispatch, RootState } from './store';
import { NotificationInterface } from '../types/NotificationInterface';

export const useNotification = () => {
  const dispatch = useDispatch();

  const displayNotification = (notification: NotificationInterface) => {
    dispatch(NotificationActions.addNotification(notification));
  };

  const clearNotification = () => {
    dispatch(NotificationActions.clearNotification());
  };

  return { displayNotification, clearNotification } as const;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
