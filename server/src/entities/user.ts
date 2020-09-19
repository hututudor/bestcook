import {
  User,
  RegisterData,
  RegisterDependencies,
  RegisterReturn,
  LoginDependencies,
  LoginData,
  LoginReturn
} from '../interfaces/user';
import {
  emailOrPasswordIncorrectError,
  userAlreadyExistsError
} from '../utils/errors';
import { createJWT } from '../utils/jwt';
import { compareWithEncrypted, encrypt } from '../utils/cryptography';
import { loginSchema, registerSchema } from '../validation/user';
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
