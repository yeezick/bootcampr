import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import { getAllNotifications, updateStatusNotification, deleteNotification } from '../../utilities/api/users';
import {
  getAllNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
} from '../../utilities/api/notifications';
import { BsBell } from 'react-icons/bs';
import { emptyNotification } from '../../utilities/data/notificationConstants';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useAppSelector } from '../../utilities/redux/hooks';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Notification.scss';
import { NotificationInterface } from '../../utilities/types/NotificationInterface';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string | boolean;
  onClose: (value: string | boolean) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const params = useParams();
  const authUser = useAppSelector(selectAuthUser);
  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
  const [notificationId, setNotificationId] = useState<any>();
  const [deleteNote, setDeleteNote] = useState<any>('63af8fcf4c625f92374af81b');

  useEffect(() => {
    const fetchNotifications = async () => {
      const displayNotifications = await getAllNotifications(authUser._id);
      setNotifications(displayNotifications);
    };
    fetchNotifications();
  }, [setNotifications]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value: any) => {
    // if ('Delete' === value) {
    console.log(authUser._id);
    await deleteAllNotifications(authUser._id);
    // }
    // if ('Read' === value) {
    //   await markNotificationAsRead(notificationId);
    // }
    onClose(value);
  };

  // console.log(notifications);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {notifications.map((notification: any) => {
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
                  setNotificationId({
                    ...notification,
                    _id: notification._id,
                    user: authUser._id,
                  });
                  handleListItemClick('Read');
                }}
              >
                Delete Notification
              </button>
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}

export const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <button className="notification-btn" onClick={handleClickOpen}>
        <BsBell size={25} />
      </button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};
