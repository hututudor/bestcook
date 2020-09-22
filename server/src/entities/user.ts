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
  ConfirmUserData,
  RemoveUserDependencies,
  RemoveUserData,
  UpdateUserDependencies,
  UpdateUserData
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
  registerSchema,
  updateUserSchema
} from '../validation/user';
import { validateSchema } from '../utils/validateSchema';
import { sendMail } from '../utils/mail';
import { generateCode } from '../utils/random';
import { databaseGetUserByEmail, databaseSaveUser } from '../mongodb/user';

export const sanitizeUser = (user: User): User => {
  const newUser = { ...user };
  delete newUser.password;
  delete newUser.confirmationCode;
  return newUser;
};

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

  const jwt = createJWT(user);
  return { jwt, user: sanitizeUser(user) };
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

  const jwt = createJWT(user);
  return { jwt, user: sanitizeUser(user) };
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
  return sanitizeUser(user);
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

export const removeUser = ({
  databaseGetUserById,
  databaseRemoveUser
}: RemoveUserDependencies) => async (data: RemoveUserData): Promise<User> => {
  const user = await getUser({ databaseGetUserById })(data);

  await databaseRemoveUser(user);
  return sanitizeUser(user);
};

export const updateUser = ({
  databaseGetUserById,
  databaseGetUserByEmail,
  databaseSaveUser
}: UpdateUserDependencies) => async (data: UpdateUserData): Promise<User> => {
  await validateSchema(updateUserSchema, data);
  const user = await getUser({ databaseGetUserById })(data);

  if (data.name) {
    user.name = data.name;
  }

  if (data.email) {
    const existingUser = await databaseGetUserByEmail(data.email);

    if (existingUser) {
      throw userAlreadyExistsError;
    }

    user.email = data.email;
  }

  if (data.password) {
    user.password = await encrypt(data.password);
  }

  await databaseSaveUser(user);
  return sanitizeUser(user);
};
