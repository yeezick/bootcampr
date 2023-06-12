import { useEffect, useState } from 'react'
import {
  getAllNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
  markAllNotificationsAsRead,
} from 'utils/api/notifications'
import { BsBell } from 'react-icons/bs'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './Notification.scss'
import { NotificationInterface } from 'interfaces/NotificationInterface'

export const NotificationModal = () => {
  const authUser = useAppSelector(selectAuthUser)
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  )
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(false)

  const fetchNotifications = async () => {
    const displayNotifications = await getAllNotifications(authUser._id)
    setNotifications(displayNotifications)
  }
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const handleClickOpen = async () => {
    fetchNotifications()
    setOpen(true)
  }

  const handleClose = (value: boolean) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div>
      <div className='notification-badge link'></div>
      <button className='notification-btn' onClick={handleClickOpen}>
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
  )
}
export interface SimpleDialogProps {
  open: boolean
  selectedValue: boolean
  onClose: (value: boolean) => void
  notifications: NotificationInterface[]
  fetchNotifications: () => void
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open, notifications, fetchNotifications } =
    props
  const authUser = useAppSelector(selectAuthUser)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleDeleteNotification = async (value: string) => {
    const deleteOneNotification = await deleteNotification(value)
    if (deleteOneNotification) fetchNotifications()
  }

  const handleReadNotification = async (value: Object) => {
    const markOneNotificationAsRead = await markNotificationAsRead(value)
    if (markOneNotificationAsRead) fetchNotifications()
  }

  const handleListItemClick = async (value: string) => {
    if (value === 'Delete-All') {
      await deleteAllNotifications(authUser._id)
    }
    if (value === 'Read-All') {
      await markAllNotificationsAsRead(authUser._id)
    }
    fetchNotifications()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{authUser.firstName}'s Notifications</DialogTitle>
      <button
        className='delete-read-all'
        onClick={() => handleListItemClick('Read-All')}
      >
        Mark All As Read
      </button>
      <List sx={{ pt: 0 }} className='notification-wrapper'>
        {notifications.length ? (
          notifications.map((notification: NotificationInterface) => {
            return (
              <ListItem
                key={notification._id}
                className='notification-wrapper notifications'
                id={notification.read ? 'read' : 'unread'}
              >
                {!notification.read && <span className='status'>unread</span>}
                <h3>{notification.title}</h3>
                <ListItemText>{notification.message}</ListItemText>
                <div className='read-delete-btn'>
                  <button
                    className='delete-read-all'
                    onClick={() => {
                      handleReadNotification({ ...notification, read: true })
                    }}
                  >
                    Mark Read
                  </button>
                  <button
                    className='delete-read-all'
                    onClick={() => {
                      handleDeleteNotification(notification._id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </ListItem>
            )
          })
        ) : (
          <p>Notifications empty</p>
        )}
        <button onClick={() => handleListItemClick('Delete-All')}>
          Delete All
        </button>
      </List>
    </Dialog>
  )
}
