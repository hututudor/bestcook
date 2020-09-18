import { User, RegisterUserData, RegisterReturn } from '../interfaces/user';
import { userAlreadyExistsError } from '../utils/errors';
import { createJWT } from '../utils/jwt';
import { encrypt } from '../utils/cryptography';
import { registerSchema } from '../validation/user';
import { validateSchema } from '../utils/validateSchema';

export const registerUser = async ({
  databaseGetUserByEmail,
  databaseSaveUser,
  data
}: RegisterUserData): Promise<RegisterReturn> => {
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

  const token = createJWT(user);
  return { token, user };
};
