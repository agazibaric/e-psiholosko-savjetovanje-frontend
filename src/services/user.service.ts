// import config from 'config';
import { RegisterForm } from 'app/pages/Register';
import { User } from 'types/User';
import { api, LocalStorage } from './';

const API_PROTO = 'http';
const API_HOSTNAME = 'localhost';
const API_PORT = '8080';
const BACKEND_ENDPOINT = 'api';
export const API_URL = `${API_PROTO}://${API_HOSTNAME}:${API_PORT}/${BACKEND_ENDPOINT}`;

const userService = {
  login,
  logout,
  getUser,
  register,
};

function login(username: string, password: string) {
  return api
    .post<any>('/authenticate', { username, password })
    .then(resp => {
      const token: string = resp.data.token;
      // Store JWT token in local storage to keep user logged in between page refreshes
      LocalStorage.setUserToken(token);
      return token;
    });
}

function logout() {
  // Remove user and token from local storage to log user out
  LocalStorage.removeUserToken();
  LocalStorage.removeUser();
}

function getUser() {
  return api.get<User>('/users/me').then(resp => {
    const user: User = resp.data;
    LocalStorage.setUser(user);
    return user;
  });
}

function register(registerForm: RegisterForm) {
  return api.post('/register', registerForm);
}

export default userService;
