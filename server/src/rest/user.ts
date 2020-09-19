import { Router } from 'express';
import { getUser, loginUser, registerUser } from '../entities/user';
import {
  databaseGetUserByEmail,
  databaseGetUserById,
  databaseSaveUser
} from '../mongodb/user';
import { restRequest } from '../utils/rest';

export const userRouter = Router();

userRouter.post(
  '/register',
  restRequest(async req => {
    return registerUser({
      databaseSaveUser,
      databaseGetUserByEmail
    })({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  })
);

userRouter.post(
  '/login',
  restRequest(async req => {
    return loginUser({
      databaseGetUserByEmail
    })({
      email: req.body.email,
      password: req.body.password
    });
  })
);

userRouter.get(
  '/me',
  restRequest(async req => {
    const user = await getUser({
      databaseGetUserById
    })({
      jwt: req.header('x-token') || ''
    });

    delete user.password;
    return user;
  })
);
