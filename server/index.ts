import * as express from 'express';
import * as Stock from '../database/stockController';
import * as User from '../database/userController';
import { userRouter as userRouter } from './userRoutes';
import { stockRouter as stockRouter } from './stockRoutes';

const app: express.Application = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/user', userRouter);

app.use('/api/stock', stockRouter);

app.listen(port, () => {
  console.log('Listening on port ', port);
});
