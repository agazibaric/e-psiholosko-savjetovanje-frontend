import { User } from 'types/User';

const TOKEN = 'TOKEN';
const USER = 'USER';

const LocalStorage = {
  getUserToken: (): string | null => {
    return localStorage.getItem(TOKEN);
  },

  setUserToken: (token: string) => {
    localStorage.setItem(TOKEN, token);
  },

  removeUserToken: (): void => {
    localStorage.removeItem(TOKEN);
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER);
  },
};

export default LocalStorage;
