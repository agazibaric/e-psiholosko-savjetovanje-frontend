export interface Authority {
  name: string;
}

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  authorities: Array<Authority>;
}

export interface Token {
  token: string
}
