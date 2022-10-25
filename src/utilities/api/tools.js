import { api } from './apiConfig';

export const getAllTools = async () => {
  try {
    const res = await api.get('/tools')
    return res.data;
  } catch (error) {
    throw error;
  }
};