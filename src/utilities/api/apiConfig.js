import axios from 'axios';

let baseURL = 'https://';
// todo: convert to function
// todo: can it be simplified?
// if there is no api_url => default local
// if there is an api_url but no api_env => fetch env from window (PR-#)
// if there is an api_url & an env => stg, prod, or dev
if (process.env.REACT_APP_API_PIPELINE) {
  baseURL += process.env.REACT_APP_API_PIPELINE;
  if (process.env.REACT_APP_API_ENV && process.env.REACT_APP_API_ENV !== '') {
    baseURL += process.env.REACT_APP_API_ENV;
  } else {
    /* TODO:  add pr-# from window object
       TODO: won't work since pr-#'s may vary between the repo's
     let pr = window.location.host;
     pr = pr.split('.')[1];
     baseURL += pr;
    */
    // defaulting to dev right now
    //will NOT match well with
    baseURL += 'br-development';
  }
  baseURL += process.env.REACT_APP_API_PROVIDER_DOMAIN;
} else {
  baseURL = 'http://localhost:8001/';
}
console.log('baseURL', baseURL);

export const api = axios.create({
  baseURL: baseURL,
});
const getToken = () => {
  return new Promise((resolve) => {
    resolve(`Bearer ${localStorage.getItem('token') || null}`);
  });
};

api.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = await getToken();
    return config;
  },
  (error) => {
    console.error('Request error: ', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  },
);
