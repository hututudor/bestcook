import { Router } from 'express';
import { loginUser, registerUser } from '../entities/user';
import { databaseGetUserByEmail, databaseSaveUser } from '../mongodb/user';

export const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  try {
    const result = await registerUser({
      databaseSaveUser,
      databaseGetUserByEmail
    })({
      name: req.body.name as string,
      email: req.body.email as string,
      password: req.body.password as string
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(e.code || 500).json({ message: e.message, payload: e.payload });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const result = await loginUser({
      databaseGetUserByEmail
    })({
      email: req.body.email as string,
      password: req.body.password as string
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(e.code || 500).json({ message: e.message, payload: e.payload });
  }
});
