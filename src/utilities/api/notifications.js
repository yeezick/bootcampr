import { api } from './apiConfig';
export const getNotifications = async () => {
  try {
    const res = await api.get('/notifications');
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const saveNotification = async (notification) => {
  try {
    const res = await api.post('/notifications', notification);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusNotification = async (id, notification) => {
  try {
    const res = await api.put(`/notifications/${id}`, notification);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
