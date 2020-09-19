import { LoginData, RegisterData, User } from '../../src/interfaces/user';
import faker from 'faker';
import { generateCode } from '../../src/utils/random';

export const createUserMock = (): User => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  confirmed: false,
  confirmationCode: generateCode(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  id: faker.random.uuid()
});

export const createRegisterDataMock = (): RegisterData => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const createLoginDataMock = (): LoginData => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});
