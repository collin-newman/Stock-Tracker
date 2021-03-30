import * as express from 'express';
import cookieParser = require('cookie-parser');
import cookieSession = require('cookie-session');
import * as Stock from '../database/stockController';
import * as User from '../database/userController';
import userRouter from './userRoutes';
import stockRouter from './stockRoutes';

const app: express.Application = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/stock', stockRouter);

app.use(express.static('dist'));

app.listen(port, () => {
  console.log('Listening on port ', port);
});
