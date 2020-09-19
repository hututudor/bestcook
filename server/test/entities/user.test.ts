import faker from 'faker';

import { loginUser, registerUser } from '../../src/entities/user';
import { LoginData, RegisterData, User } from '../../src/interfaces/user';
import {
  emailOrPasswordIncorrectError,
  userAlreadyExistsError,
  validationFailed
} from '../../src/utils/errors';
import { compareWithEncrypted, encrypt } from '../../src/utils/cryptography';

describe('user api', () => {
  describe('register', () => {
    it('should register a new user and create a token', async () => {
      const data: RegisterData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      const databaseGetUserByEmail = async () => null;
      const databaseSaveUser = async (user: User) => {
        expect(
          await compareWithEncrypted(data.password, user.password || '')
        ).toBeTruthy();
        return user;
      };

      const response = await registerUser({
        databaseSaveUser,
        databaseGetUserByEmail
      })(data);

      expect(response.user.name).toBe(data.name);
      expect(response.user.email).toBe(data.email);
      expect(response.token).toBeTruthy();
      expect(response.user.password).toBeUndefined();
    });

    it('should throw if email already exists', async () => {
      const data: RegisterData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      const existingUser: User = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        id: faker.random.uuid()
      };

      const databaseGetUserByEmail = async () => existingUser;
      const databaseSaveUser = async (user: User) => user;

      await registerUser({
        databaseSaveUser,
        databaseGetUserByEmail
      })(data)
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err).toBe(userAlreadyExistsError);
        });
    });

    it('should throw if validation fails', async () => {
      const data: RegisterData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(2)
      };

      const databaseGetUserByEmail = async () => null;
      const databaseSaveUser = async (user: User) => user;

      await registerUser({
        databaseSaveUser,
        databaseGetUserByEmail
      })(data)
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err.message).toBe(validationFailed('').message);
        });
    });
  });

  describe('login', () => {
    it('should login a user and create a token', async () => {
      const data: LoginData = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      const existingUser: User = {
        name: faker.name.firstName(),
        email: data.email,
        password: await encrypt(data.password),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        id: faker.random.uuid()
      };

      const databaseGetUserByEmail = async () => existingUser;

      const response = await loginUser({
        databaseGetUserByEmail
      })(data);

      expect(response.token).toBeTruthy();
      expect(response.user.name).toBe(existingUser.name);
      expect(response.user.email).toBe(data.email);
      expect(response.user.password).toBeUndefined();
    });

    it('should throw an error if email is not found', async () => {
      const data: LoginData = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      const databaseGetUserByEmail = async () => null;

      await loginUser({
        databaseGetUserByEmail
      })(data)
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err).toBe(emailOrPasswordIncorrectError);
        });
    });

    it('should throw an error if password is incorrect', async () => {
      const data: LoginData = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      const existingUser: User = {
        name: faker.name.firstName(),
        email: data.email,
        password: faker.internet.password(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        id: faker.random.uuid()
      };

      const databaseGetUserByEmail = async () => existingUser;

      await loginUser({
        databaseGetUserByEmail
      })(data)
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err).toBe(emailOrPasswordIncorrectError);
        });
    });

    it('should throw an error if validation fails', async () => {
      const data: LoginData = {
        email: '',
        password: faker.internet.password()
      };

      const databaseGetUserByEmail = async () => null;

      await loginUser({
        databaseGetUserByEmail
      })(data)
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err.message).toBe(validationFailed('').message);
        });
    });
  });
});
