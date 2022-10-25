import { api } from './apiConfig';

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    throw error;
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
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const res = await api.post('/sign-in', credentials);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    // const user = jwtDecode(res.data.token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    throw error;
  }
}; // missing endpoint

export const verify = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { data: payload } = await api.get('/verify');
    const { data: user } = await api.get(`/users/${payload.userID}`);
    return user;
  }
  return false;
};
