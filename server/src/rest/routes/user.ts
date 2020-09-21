import { Router } from 'express';
import {
  confirmUser,
  getUser,
  loginUser,
  registerUser,
  removeUser,
  sanitizeUser
} from '../../entities/user';
import {
  databaseGetUserByEmail,
  databaseGetUserById,
  databaseRemoveUser,
  databaseSaveUser
} from '../../mongodb/user';
import { restRequest } from '../utils/restRequest';
import { getToken } from '../utils/getToken';

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
    return sanitizeUser(
      await getUser({
        databaseGetUserById
      })({
        jwt: getToken(req)
      })
    );
  })
);

userRouter.post(
  '/confirm',
  restRequest(async req => {
    return confirmUser({
      databaseGetUserByEmail,
      databaseSaveUser
    })({
      email: req.body.email,
      code: req.body.code
    });
  })
);

userRouter.delete(
  '/',
  restRequest(async req => {
    return removeUser({
      databaseGetUserById,
      databaseRemoveUser
    })({
      jwt: getToken(req)
    });
  })
);
