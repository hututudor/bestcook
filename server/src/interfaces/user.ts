export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterReturn {
  user: User;
  token: string;
}

export interface RegisterUserData {
  databaseGetUserByEmail: (email: string) => Promise<User | null>;
  databaseSaveUser: (user: User) => Promise<User>;
  data: {
    name: string;
    email: string;
    password: string;
  };
}
