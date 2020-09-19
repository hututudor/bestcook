import { string } from 'yup';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterReturn {
  user: User;
  token: string;
}

export interface RegisterDependencies {
  databaseGetUserByEmail: (email: string) => Promise<User | null>;
  databaseSaveUser: (user: User) => Promise<User>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginReturn {
  user: User;
  token: string;
}

export interface LoginDependencies {
  databaseGetUserByEmail: (email: string) => Promise<User | null>;
}

export interface LoginData {
  email: string;
  password: string;
}
