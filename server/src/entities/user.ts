import {
  User,
  RegisterData,
  RegisterDependencies,
  RegisterReturn,
  LoginDependencies,
  LoginData,
  LoginReturn,
  GetUserDependencies,
  GetUserData,
  ConfirmUserDependencies,
  ConfirmUserData
} from '../interfaces/user';
import {
  confirmationCodeIsInvalidError,
  emailOrPasswordIncorrectError,
  userAlreadyConfirmedError,
  userAlreadyExistsError,
  userDoesNotExistsError,
  userNotConfirmedError
} from '../utils/errors';
import { createJWT, decodeJWT } from '../utils/jwt';
import { compareWithEncrypted, encrypt } from '../utils/cryptography';
import {
  confirmUserSchema,
  getUserSchema,
  loginSchema,
  registerSchema
} from '../validation/user';
import { validateSchema } from '../utils/validateSchema';
import { sendMail } from '../utils/mail';
import { generateCode } from '../utils/random';

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
    confirmed: false,
    confirmationCode: generateCode(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  user = await databaseSaveUser(user);

  await sendMail(
    data.email,
    'Registration code',
    `Your code is ${user.confirmationCode}`
  );

  delete user.password;
  delete user.confirmationCode;

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

  if (!user.confirmed) {
    throw userNotConfirmedError;
  }

  delete user.password;
  delete user.confirmationCode;

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

  if (!user.confirmed) {
    throw userNotConfirmedError;
  }

  return user;
};

export const confirmUser = ({
  databaseGetUserByEmail,
  databaseSaveUser
}: ConfirmUserDependencies) => async (data: ConfirmUserData): Promise<User> => {
  await validateSchema(confirmUserSchema, data);

  const user = await databaseGetUserByEmail(data.email);

  if (!user) {
    throw userDoesNotExistsError;
  }

  if (user.confirmed) {
    throw userAlreadyConfirmedError;
  }

  if (user.confirmationCode !== data.code) {
    throw confirmationCodeIsInvalidError;
  }

  user.confirmed = true;

  await databaseSaveUser(user);

  delete user.confirmationCode;
  delete user.password;

  return user;
};
