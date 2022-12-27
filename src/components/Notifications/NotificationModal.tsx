import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getNotifications, updateStatusNotification, deleteNotification } from '../../utilities/api/users';
import { NotificationState } from '../../utilities/types/NotificationInterface';
import { NotificationsInterface } from '../../utilities/types/UserInterface';
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
  const [notifications, setNotifications] = useState<NotificationState[]>();

  useEffect(() => {
    const fetchNotifications = async () => {
      const displayNotifications = await getNotifications();
      setNotifications(displayNotifications);
    };
    fetchNotifications();
  }, [setNotifications]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string | boolean) => {
    console.log(value);
    onClose(value);
    // setNotifications({ ...notifications, user: authUser._id});
  };

  console.log(selectedValue);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {notifications?.map((notification) => {
          return (
            <ListItem key={notification._id}>
              <h3>{notification.notification}</h3>
              <ListItemText>{notification.message}</ListItemText>
              <ListItem button onClick={() => handleListItemClick('addAccount')}>
                Mark as Read
              </ListItem>
              <ListItem button onClick={() => handleListItemClick('addAccount')}>
                Delete Notification
              </ListItem>
            </ListItem>
          );
        })}
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>

      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};
