import faker from 'faker';

import { registerUser } from '../src/entities/user';
import { User } from '../src/interfaces/user';
import { userAlreadyExistsError, validationFailed } from '../src/utils/errors';
import { compare } from 'bcrypt';
import { compareWithEncrypted } from '../src/utils/cryptography';

describe('user api', () => {
  describe('register', () => {
    it('should register a new user and create a token', async () => {
      const data = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };

      const databaseGetUserByEmail = async () => null;
      const databaseSaveUser = async (user: User) => user;

      const response = await registerUser({
        databaseSaveUser,
        databaseGetUserByEmail,
        data
      });

      expect(response.user.name).toBe(data.name);
      expect(response.user.email).toBe(data.email);
      expect(
        await compareWithEncrypted(data.password, response.user.password)
      ).toBeTruthy();
      expect(response.token).toBeTruthy();
    });

    it('should throw if email already exists', async () => {
      const data = {
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
        databaseGetUserByEmail,
        data
      })
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err).toBe(userAlreadyExistsError);
        });
    });

    it('should throw if validation fails', async () => {
      const data = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(2)
      };

      const databaseGetUserByEmail = async () => null;
      const databaseSaveUser = async (user: User) => user;

      await registerUser({
        databaseSaveUser,
        databaseGetUserByEmail,
        data
      })
        .then(() => {
          throw new Error('Did not throw error');
        })
        .catch(err => {
          expect(err.message).toBe(validationFailed('').message);
        });
    });
  });
});
