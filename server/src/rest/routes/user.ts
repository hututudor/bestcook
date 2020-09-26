import { Router } from 'express';
import {
  confirmUser,
  getUser,
  loginUser,
  registerUser,
  removeUser,
  sanitizeUser,
  updateUser
} from '../../entities/user';
import {
  databaseGetUserByEmail,
  databaseGetUserById,
  databaseRemoveUser,
  databaseSaveUser
} from '../../mongodb/user';
import { restRequest } from '../utils/restRequest';
import { includeJWT } from '../utils/include';

export const userRouter = Router();

const includeCommonFields = (req: any) => ({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
});

userRouter.post(
  '/register',
  restRequest(async req => {
    return registerUser({
      databaseSaveUser,
      databaseGetUserByEmail
    })(includeCommonFields(req));
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
      })(includeJWT(req))
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

userRouter.put(
  '/',
  restRequest(async req => {
    return updateUser({
      databaseGetUserByEmail,
      databaseGetUserById,
      databaseSaveUser
    })({
      ...includeJWT(req),
      ...includeCommonFields(req)
    });
  })
);

userRouter.delete(
  '/',
  restRequest(async req => {
    return removeUser({
      databaseGetUserById,
      databaseRemoveUser
    })(includeJWT(req));
  })
);
