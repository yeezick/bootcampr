import axios from 'axios';
import { api } from './apiConfig';
import { PasswordFormData, EmailFormData } from '../types/AccountSettingsInterface';
import { UserInterface } from '../types/UserInterface';

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOneUser = async (id: any) => {
  try {
    const res = await api.get(`/users/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string | undefined,
  userUpdate: UserInterface,
  imageWasUpdated: boolean | null,
) => {
  try {
    const res = await api.put(`/users/${id}`, { ...userUpdate, imageWasUpdated });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addPortfolioProject = async (id: any, newProject: any) => {
  try {
    const res = await api.patch(`/users/${id}`, newProject);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmailAuth = async (email: any) => {
  try {
    const res = await api.post('/email', email);
    return res.data.message;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (credentials: any) => {
  try {
    const res = await api.post('/sign-up', credentials);
    const { bootcamprAuthToken, user } = res.data;
    localStorage.setItem('bootcamprAuthToken', bootcamprAuthToken);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials: any) => {
  try {
    const res = await api.post('/sign-in', credentials);
    const { bootcamprAuthToken, user } = res.data;
    localStorage.setItem('bootcamprAuthToken', bootcamprAuthToken);
    // const user = jwtDecode(res.data.bootcamprAuthToken);
    return user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    localStorage.removeItem('bootcamprAuthToken');
  } catch (error) {
    throw error;
  }
};

export const verify = async () => {
  const bootcamprAuthToken = localStorage.getItem('bootcamprAuthToken');
  if (bootcamprAuthToken) {
    const { data: payload } = await api.get('/verify');
    const { data: user } = await api.get(`/users/${payload.userID}`);
    return user;
  }
  return false;
};

export const createUserImage = async (profileImageFile: File, userId: string) => {
  const addUserImage = new FormData();
  addUserImage.append('image', profileImageFile);
  addUserImage.append('userId', userId);
  return await axios.post(`${process.env.REACT_APP_LOCAL_URL}addUserImage`, addUserImage, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateUsersEmail = async (formData: PasswordFormData | EmailFormData, userId: string | undefined) => {
  try {
    const data = await api.patch(`/update-email/${userId}`, formData);
    return data;
  } catch (error) {
    return { error: 'Something went wrong' };
  }
};

export const updateUsersPassword = async (formData: PasswordFormData | EmailFormData, userId: string | undefined) => {
  try {
    const data = await api.patch(`/update-password/${userId}`, formData);
    return data;
  } catch (error) {
    return { error: { status: 500, message: 'Something went wrong' } };
  }
};
