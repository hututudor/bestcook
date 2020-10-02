import { recipeRouter } from './routes/recipe';

require('dotenv').config();

import express from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { userRouter } from './routes/user';

connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to the database');
});

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.use('/users', userRouter);
app.use('/recipes', recipeRouter);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});
