import { api } from './apiConfig';

export const getAllNotifications = async (user) => {
  try {
    const res = await api.get('/notifications', user);
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteNotification = async (_id) => {
  try {
    const res = await api.delete(`/notifications/${_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotifications = async (user) => {
  try {
    const res = await api.delete(`/delete-notifications/${user}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead = async (_id) => {
  try {
    const res = await api.patch('/notifications', _id);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const markAllNotificationsAsRead = async (user) => {
  try {
    const res = await api.patch(`/all-notifications/${user}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
