export interface Authority {
  name: string;
}

export interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  authorities: Array<Authority>;
}

export interface Token {
  token: string
}
