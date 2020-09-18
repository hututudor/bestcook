import { Router } from 'express';
import { registerUser } from '../entities/user';
import { databaseGetUserByEmail, databaseSaveUser } from '../mongodb/user';

export const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  try {
    const result = await registerUser({
      data: {
        name: req.body.name as string,
        email: req.body.email as string,
        password: req.body.password as string
      },
      databaseSaveUser,
      databaseGetUserByEmail
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(e.code || 500).json({ message: e.message, payload: e.payload });
  }
});
