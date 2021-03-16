import { LocalStorage } from 'services';

export interface IAuthHeader {
  [Authorization: string]: string;
}

export function authHeader(): IAuthHeader | {} {
  // Return authorization header with jwt token
  const token = LocalStorage.getUserToken();

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
