import React, { useEffect, useState } from 'react';
import {
  getAllNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
  markAllNotificationsAsRead,
} from '../../utilities/api/notifications';
import { BsBell } from 'react-icons/bs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useAppSelector } from '../../utilities/redux/hooks';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Notification.scss';
import { NotificationInterface } from '../../utilities/types/NotificationInterface';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: boolean;
  onClose: (value: boolean) => void;
  notifications: NotificationInterface[];
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, notifications } = props;
  const authUser = useAppSelector(selectAuthUser);
  const [notificationId, setNotificationId] = useState<NotificationInterface | string>();

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {}, []);

  const handleListItemClick = async (value: string) => {
    if ('Delete' === value) {
      await deleteNotification(notificationId);
    }
    if ('Read' === value) {
      await markNotificationAsRead(notificationId);
    }
    if ('Delete-All' === value) {
      await deleteAllNotifications(authUser._id);
    }
    if ('Read-All' === value) {
      await markAllNotificationsAsRead(authUser._id);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{authUser.firstName}'s Notifications</DialogTitle>
      <List sx={{ pt: 0 }}>
        {notifications.length !== 0 ? (
          notifications.map((notification: NotificationInterface) => {
            return (
              <ListItem key={notification._id}>
                <h3>{notification.title}</h3>
                <ListItemText>{notification.message}</ListItemText>
                <button
                  onClick={() => {
                    setNotificationId({
                      ...notification,
                      _id: notification._id,
                      user: authUser._id,
                      read: true,
                    });
                    handleListItemClick('Read');
                  }}
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => {
                    setNotificationId(notification._id);
                    handleListItemClick('Delete');
                  }}
                >
                  Delete Notification
                </button>
              </ListItem>
            );
          })
        ) : (
          <p>Notifications empty</p>
        )}
        <button onClick={() => handleListItemClick('Read-All')}>Mark All As Read</button>
        <button onClick={() => handleListItemClick('Delete-All')}>Delete All Notifications</button>
      </List>
    </Dialog>
  );
}

export const NotificationModal = () => {
  const authUser = useAppSelector(selectAuthUser);
  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);

  const fetchNotifications = async () => {
    const displayNotifications = await getAllNotifications(authUser._id);
    setNotifications(displayNotifications);
  };
  useEffect(() => {
    fetchNotifications();
    if (notifications) {
      fetchNotifications();
    }
  }, [notifications.length]);

  const handleClickOpen = async () => {
    fetchNotifications();
    setOpen(true);
  };

  const handleClose = (value: boolean) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <button className="notification-btn" onClick={handleClickOpen}>
        <BsBell size={25} />
      </button>
      <SimpleDialog notifications={notifications} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};
