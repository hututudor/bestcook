import faker from 'faker';

import { getUser, loginUser, registerUser } from '../../src/entities/user';
import { User } from '../../src/interfaces/user';
import {
  emailOrPasswordIncorrectError,
  tokenInvalidError,
  userAlreadyExistsError,
  validationFailed
} from '../../src/utils/errors';
import { compareWithEncrypted, encrypt } from '../../src/utils/cryptography';
import { createJWT } from '../../src/utils/jwt';
import {
  createLoginDataMock,
  createRegisterDataMock,
  createUserMock
} from '../mocks/user';
import { expectToThrow } from '../utils/expectToThrow';

describe('user api', () => {
  describe('register', () => {
    it('should register a new user and create a token', async () => {
      const data = createRegisterDataMock();

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
      const data = createRegisterDataMock();

      const databaseGetUserByEmail = async () => createUserMock();
      const databaseSaveUser = async (user: User) => user;

      expectToThrow(
        registerUser({
          databaseSaveUser,
          databaseGetUserByEmail
        })(data),
        userAlreadyExistsError
      );
    });

    it('should throw if validation fails', async () => {
      const data = createRegisterDataMock();
      data.password = faker.internet.password(2);

      const databaseGetUserByEmail = async () => null;
      const databaseSaveUser = async (user: User) => user;

      expectToThrow(
        registerUser({
          databaseSaveUser,
          databaseGetUserByEmail
        })(data),
        validationFailed()
      );
    });
  });

  describe('login', () => {
    it('should login a user and create a token', async () => {
      const data = createLoginDataMock();

      const existingUser = createUserMock();
      existingUser.password = await encrypt(data.password);
      existingUser.email = data.email;

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
      const data = createLoginDataMock();

      const databaseGetUserByEmail = async () => null;

      expectToThrow(
        loginUser({
          databaseGetUserByEmail
        })(data),
        emailOrPasswordIncorrectError
      );
    });

    it('should throw an error if password is incorrect', async () => {
      const data = createLoginDataMock();

      const databaseGetUserByEmail = async () => createUserMock();

      expectToThrow(
        loginUser({
          databaseGetUserByEmail
        })(data),
        emailOrPasswordIncorrectError
      );
    });

    it('should throw an error if validation fails', async () => {
      const data = createLoginDataMock();
      data.email = '';

      const databaseGetUserByEmail = async () => null;

      expectToThrow(
        loginUser({
          databaseGetUserByEmail
        })(data),
        validationFailed()
      );
    });
  });

  describe('get', () => {
    it('should get user if token is valid', async () => {
      const existingUser = createUserMock();
      const jwt = createJWT(existingUser);

      const databaseGetUserById = async (id: string) => {
        expect(id).toBe(existingUser.id);
        return existingUser;
      };

      const response = await getUser({
        databaseGetUserById
      })({ jwt });

      expect(response.name).toBe(existingUser.name);
      expect(response.email).toBe(existingUser.email);
      expect(response.password).toBeTruthy();
    });

    it('should throw if token is invalid', async () => {
      const databaseGetUserById = async () => null;

      expectToThrow(
        getUser({
          databaseGetUserById
        })({ jwt: 'token' }),
        tokenInvalidError
      );
    });

    it('should throw if token is validation fails', async () => {
      const databaseGetUserById = async () => null;

      expectToThrow(
        getUser({
          databaseGetUserById
        })({ jwt: '' }),
        validationFailed()
      );
    });
  });
});
