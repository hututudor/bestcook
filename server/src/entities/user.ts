import {
  User,
  RegisterData,
  RegisterDependencies,
  RegisterReturn,
  LoginDependencies,
  LoginData,
  LoginReturn,
  GetUserDependencies,
  GetUserData
} from '../interfaces/user';
import {
  emailOrPasswordIncorrectError,
  userAlreadyExistsError,
  userDoesNotExistsError
} from '../utils/errors';
import { createJWT, decodeJWT } from '../utils/jwt';
import { compareWithEncrypted, encrypt } from '../utils/cryptography';
import { getUserSchema, loginSchema, registerSchema } from '../validation/user';
import { validateSchema } from '../utils/validateSchema';

export const registerUser = ({
  databaseGetUserByEmail,
  databaseSaveUser
}: RegisterDependencies) => async (
  data: RegisterData
): Promise<RegisterReturn> => {
  await validateSchema(registerSchema, data);

  const existingUser = await databaseGetUserByEmail(data.email);

  if (existingUser) {
    throw userAlreadyExistsError;
  }

  let user: User = {
    id: '',
    name: data.name,
    email: data.email,
    password: await encrypt(data.password),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  user = await databaseSaveUser(user);
  delete user.password;

  const token = createJWT(user);
  return { token, user };
};

export const loginUser = ({
  databaseGetUserByEmail
}: LoginDependencies) => async (data: LoginData): Promise<LoginReturn> => {
  await validateSchema(loginSchema, data);

  const user = await databaseGetUserByEmail(data.email);

  if (!user || !(await compareWithEncrypted(data.password, user.password!))) {
    throw emailOrPasswordIncorrectError;
  }

  delete user.password;

  const token = createJWT(user);
  return { token, user };
};

export const getUser = ({ databaseGetUserById }: GetUserDependencies) => async (
  data: GetUserData
): Promise<User> => {
  await validateSchema(getUserSchema, data);

  const userId = decodeJWT(data.jwt);
  const user = await databaseGetUserById(userId);

  if (!user) {
    throw userDoesNotExistsError;
  }

  return user;
};
