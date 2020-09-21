import { Schema, model } from 'mongoose';

import { User } from '../interfaces/user';
import {
  getModelByField,
  getModelById,
  removeModel,
  saveModel
} from './utils/generics';

const UserModel = model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      confirmed: {
        type: Boolean,
        default: false
      },
      confirmationCode: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  )
);

const castMongoToInterface = (user: any): User => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    confirmed: user.confirmed,
    confirmationCode: user.confirmationCode,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

const castInterfaceToMongo = (user: User): any => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    confirmed: user.confirmed,
    confirmationCode: user.confirmationCode,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

export const databaseGetUserByEmail = getModelByField<User, string>({
  castInterfaceToMongo,
  castMongoToInterface,
  Model: UserModel,
  field: 'email'
});

export const databaseGetUserById = getModelById<User>({
  castMongoToInterface,
  castInterfaceToMongo,
  Model: UserModel
});

export const databaseSaveUser = saveModel<User>({
  castMongoToInterface,
  castInterfaceToMongo,
  Model: UserModel
});

export const databaseRemoveUser = removeModel<User>({
  castMongoToInterface,
  castInterfaceToMongo,
  Model: UserModel
});
