export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  id?: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  email?: string; // credentials
  token?: string;
}
