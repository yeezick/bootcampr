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
  fetchNotifications: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, notifications, fetchNotifications } = props;
  const authUser = useAppSelector(selectAuthUser);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleDeleteNotification = async (value: string) => {
    const deleteOneNotification = await deleteNotification(value);
    if (deleteOneNotification) fetchNotifications();
  };

  const handleReadNotification = async (value: any) => {
    console.log(value);
    const markOneNotificationAsRead = await markNotificationAsRead(value);
    if (markOneNotificationAsRead) fetchNotifications();
  };

  const handleListItemClick = async (value: string) => {
    if ('Delete-All' === value) {
      await deleteAllNotifications(authUser._id);
    }
    if ('Read-All' === value) {
      await markAllNotificationsAsRead(authUser._id);
    }
    fetchNotifications();
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
                    handleReadNotification({ ...notification, read: true });
                  }}
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => {
                    handleDeleteNotification(notification._id);
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
  }, []);

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
      <SimpleDialog
        fetchNotifications={fetchNotifications}
        notifications={notifications}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
