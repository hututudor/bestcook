import { Schema, model } from 'mongoose';

import { User } from '../interfaces/user';

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

export const databaseGetUserByEmail = async (
  email: string
): Promise<User | null> => {
  const [user] = await UserModel.find({ email });

  if (user) {
    return castMongoToInterface(user);
  }

  return null;
};

export const databaseGetUserById = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById(id);

  if (user) {
    return castMongoToInterface(user);
  }

  return null;
};

export const databaseSaveUser = async (user: User): Promise<User> => {
  try {
    await UserModel.findByIdAndUpdate(user.id, castInterfaceToMongo(user));
    return user;
  } catch (e) {
    const newUser = new UserModel(castInterfaceToMongo(user));
    await newUser.save();
    return castMongoToInterface(newUser);
  }
};
