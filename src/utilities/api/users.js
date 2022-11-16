import { api } from './apiConfig';

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOneUser = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userUpdate) => {
  try {
    const res = await api.put(`/users/${id}`, userUpdate);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addPortfolioProject = async (id, newProject) => {
  try {
    const res = await api.patch(`/users/${id}`, newProject);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmailAuth = async (email) => {
  try {
    const res = await api.post('/email', email);
    return res.data.message;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (credentials) => {
  try {
    const res = await api.post('/sign-up', credentials);
    const { bootcamprAuthToken, user } = res.data;
    localStorage.setItem('bootcamprAuthToken', bootcamprAuthToken);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
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
