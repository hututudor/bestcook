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

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ConfirmUserData {
  email: string;
  code: string;
}
