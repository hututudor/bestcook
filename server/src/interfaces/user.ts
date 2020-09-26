import {
  DatabaseGetByField,
  DatabaseGetById,
  DatabaseRemove,
  DatabaseSave,
  HasID,
  HasTimestamps
} from './utils/generics';

export interface User extends HasID, HasTimestamps {
  name: string;
  email: string;
  password?: string;
  confirmed: boolean;
  confirmationCode?: string;
}

export interface HasToken {
  jwt: string;
}

export interface HasAuth {
  databaseGetUserById: DatabaseGetById<User>;
}

export interface RegisterReturn extends HasToken {
  user: User;
}

export interface RegisterDependencies {
  databaseGetUserByEmail: DatabaseGetByField<User, string>;
  databaseSaveUser: DatabaseSave<User>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginReturn extends HasToken {
  user: User;
}

export interface LoginDependencies {
  databaseGetUserByEmail: DatabaseGetByField<User, string>;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GetUserDependencies extends HasAuth {}

export interface GetUserData extends HasToken {}

export interface ConfirmUserDependencies {
  databaseGetUserByEmail: DatabaseGetByField<User, string>;
  databaseSaveUser: DatabaseSave<User>;
}

export interface ConfirmUserData {
  email: string;
  code: string;
}

export interface RemoveUserData extends HasToken {}

export interface RemoveUserDependencies extends HasAuth {
  databaseRemoveUser: DatabaseRemove<User>;
}

export interface UpdateUserData extends HasToken {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserDependencies extends HasAuth {
  databaseSaveUser: DatabaseSave<User>;
  databaseGetUserByEmail: DatabaseGetByField<User, string>;
}
