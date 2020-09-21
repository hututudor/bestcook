import faker from 'faker';

import {
  confirmUser,
  getUser,
  loginUser,
  registerUser,
  removeUser
} from '../../src/entities/user';
import {
  ConfirmUserData,
  RemoveUserData,
  User
} from '../../src/interfaces/user';
import {
  confirmationCodeIsInvalidError,
  emailOrPasswordIncorrectError,
  tokenInvalidError,
  userAlreadyConfirmedError,
  userAlreadyExistsError,
  userNotConfirmedError,
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
import { generateCode } from '../../src/utils/random';

describe('user api', () => {
  describe('register', () => {
    it('should register a new user and create a token', async () => {
      const data = createRegisterDataMock();

      const databaseGetUserByEmail = async () => null;
      const databaseSaveUser = async (user: User) => {
        expect(
          await compareWithEncrypted(data.password, user.password || '')
        ).toBeTruthy();

        expect(user.confirmationCode).toBeTruthy();
        expect(user.confirmationCode?.length).toBe(8);
        return user;
      };

      const response = await registerUser({
        databaseSaveUser,
        databaseGetUserByEmail
      })(data);

      expect(response.user.name).toBe(data.name);
      expect(response.user.email).toBe(data.email);
      expect(response.user.confirmationCode).toBeUndefined();
      expect(response.user.password).toBeUndefined();
    });

    it('should throw if email already exists', async () => {
      const data = createRegisterDataMock();

      const databaseGetUserByEmail = async () => createUserMock();
      const databaseSaveUser = async (user: User) => user;

      await expectToThrow(
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

      await expectToThrow(
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
      existingUser.confirmed = true;

      const databaseGetUserByEmail = async () => existingUser;

      const response = await loginUser({
        databaseGetUserByEmail
      })(data);

      expect(response.token).toBeTruthy();
      expect(response.user.name).toBe(existingUser.name);
      expect(response.user.email).toBe(data.email);
      expect(response.user.confirmationCode).toBeUndefined();
      expect(response.user.password).toBeUndefined();
    });

    it('should throw an error if email is not found', async () => {
      const data = createLoginDataMock();

      const databaseGetUserByEmail = async () => null;

      await expectToThrow(
        loginUser({
          databaseGetUserByEmail
        })(data),
        emailOrPasswordIncorrectError
      );
    });

    it('should throw an error if password is incorrect', async () => {
      const data = createLoginDataMock();

      const databaseGetUserByEmail = async () => createUserMock();

      await expectToThrow(
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

      await expectToThrow(
        loginUser({
          databaseGetUserByEmail
        })(data),
        validationFailed()
      );
    });

    it('should throw if the user is not confirmed', async () => {
      const data = createLoginDataMock();

      const existingUser = createUserMock();
      existingUser.password = await encrypt(data.password);
      existingUser.email = data.email;
      existingUser.confirmed = false;

      const databaseGetUserByEmail = async () => existingUser;

      await expectToThrow(
        loginUser({
          databaseGetUserByEmail
        })(data),
        userNotConfirmedError
      );
    });
  });

  describe('get', () => {
    it('should get user if token is valid', async () => {
      const existingUser = createUserMock();
      existingUser.confirmed = true;
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

      await expectToThrow(
        getUser({
          databaseGetUserById
        })({ jwt: 'token' }),
        tokenInvalidError
      );
    });

    it('should throw if validation fails', async () => {
      const databaseGetUserById = async () => null;

      await expectToThrow(
        getUser({
          databaseGetUserById
        })({ jwt: '' }),
        validationFailed()
      );
    });

    it('should throw if user is not confirmed', async () => {
      const user = createUserMock();
      const databaseGetUserById = async () => user;

      await expectToThrow(
        getUser({
          databaseGetUserById
        })({ jwt: createJWT(user) }),
        userNotConfirmedError
      );
    });
  });

  describe('confirm', () => {
    it('should confirm user if code is valid', async () => {
      const existingUser = createUserMock();

      const data: ConfirmUserData = {
        email: existingUser.email,
        code: existingUser.confirmationCode || ''
      };

      const databaseGetUserByEmail = async (email: string) => existingUser;
      const databaseSaveUser = async (user: User) => user;

      const response = await confirmUser({
        databaseGetUserByEmail,
        databaseSaveUser
      })(data);

      expect(response.name).toBe(existingUser.name);
      expect(response.email).toBe(existingUser.email);
      expect(response.password).toBeUndefined();
      expect(response.confirmationCode).toBeUndefined();
    });

    it('should throw if code is invalid', async () => {
      const existingUser = createUserMock();

      const data: ConfirmUserData = {
        email: existingUser.email,
        code: generateCode()
      };

      const databaseGetUserByEmail = async (email: string) => existingUser;
      const databaseSaveUser = async (user: User) => user;

      await expectToThrow(
        confirmUser({
          databaseGetUserByEmail,
          databaseSaveUser
        })(data),
        confirmationCodeIsInvalidError
      );
    });

    it('should throw if validation fails', async () => {
      const existingUser = createUserMock();

      const data: ConfirmUserData = {
        email: '',
        code: existingUser.confirmationCode || ''
      };

      const databaseGetUserByEmail = async (email: string) => existingUser;
      const databaseSaveUser = async (user: User) => user;

      await expectToThrow(
        confirmUser({
          databaseGetUserByEmail,
          databaseSaveUser
        })(data),
        validationFailed()
      );
    });

    it('should throw if user is already confirmed', async () => {
      const existingUser = createUserMock(true);

      const data: ConfirmUserData = {
        email: existingUser.email,
        code: existingUser.confirmationCode || ''
      };

      const databaseGetUserByEmail = async (email: string) => existingUser;
      const databaseSaveUser = async (user: User) => user;

      await expectToThrow(
        confirmUser({
          databaseGetUserByEmail,
          databaseSaveUser
        })(data),
        userAlreadyConfirmedError
      );
    });
  });

  describe('remove', () => {
    it('should remove current user if a valid token is provided', async () => {
      const existingUser = createUserMock(true);
      const jwt = createJWT(existingUser);

      const data: RemoveUserData = {
        jwt
      };

      const databaseGetUserById = async (id: string) => existingUser;
      const databaseRemoveUser = async (user: User) => user;

      const response = await removeUser({
        databaseGetUserById,
        databaseRemoveUser
      })(data);

      expect(response.name).toBe(existingUser.name);
      expect(response.email).toBe(existingUser.email);
      expect(response.password).toBeUndefined();
      expect(response.confirmationCode).toBeUndefined();
    });

    it('should throw if token is invalid', async () => {
      const existingUser = createUserMock();

      const data: RemoveUserData = {
        jwt: 'token'
      };

      const databaseGetUserById = async (id: string) => existingUser;
      const databaseRemoveUser = async (user: User) => user;

      await expectToThrow(
        removeUser({
          databaseGetUserById,
          databaseRemoveUser
        })(data),
        tokenInvalidError
      );
    });

    it('should throw if validation fails', async () => {
      const databaseGetUserById = async (id: string) => null;
      const databaseRemoveUser = async (user: User) => user;

      await expectToThrow(
        removeUser({
          databaseGetUserById,
          databaseRemoveUser
        })({ jwt: '' }),
        validationFailed()
      );
    });

    it('should throw if user is not confirmed', async () => {
      const existingUser = createUserMock();
      const jwt = createJWT(existingUser);

      const data: RemoveUserData = {
        jwt
      };

      const databaseGetUserById = async (id: string) => existingUser;
      const databaseRemoveUser = async (user: User) => user;

      await expectToThrow(
        removeUser({
          databaseGetUserById,
          databaseRemoveUser
        })(data),
        userNotConfirmedError
      );
    });
  });
});
