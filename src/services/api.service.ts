import Axios from 'axios';
import { userService } from 'services';
import LocalStorage from './localStorage';

const API_PROTO = 'http';
const API_HOSTNAME = 'localhost';
const API_PORT = '8080';
const BACKEND_ENDPOINT = 'api';
export const API_URL = `${API_PROTO}://${API_HOSTNAME}:${API_PORT}/${BACKEND_ENDPOINT}`;

let urls = {
  test: API_URL,
  development: API_URL,
  production: 'https://production-url.com/',
};

// api is Axios instance
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add authorization header
api.interceptors.request.use(config => {
  const token = LocalStorage.getUserToken();
  if (token) config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
});

// Handle response status
api.interceptors.response.use(
  response => {
    if (response.status === 401) {
      userService.logout();
    }
    return response;
  },
  error => {
    return Promise.reject(error.message);
  },
);

export default api;
