export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  confirmed: boolean;
  confirmationCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  jwt: string;
  user: User;
}

export interface LoginResponse {
  jwt: string;
  user: User;
}
