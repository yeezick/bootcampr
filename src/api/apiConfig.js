import axios from 'axios';

const getToken = () => {
  return new Promise((resolve) => {
    resolve(`Bearer ${localStorage.getItem('token') || null}`);
  });
};

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://bootcamper-dev-backend.herokuapp.com/api'
      : 'http://localhost:8001/api',
});

api.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = await getToken();
    return config;
  },
  (error) => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);
