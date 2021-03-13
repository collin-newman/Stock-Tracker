import * as express from 'express';
import * as User from '../database/userController';

export const userRouter: express.Router = express.Router();

userRouter.post('/signup', (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  User.create({ username, password }, req, res);
});

userRouter.post('/login', (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  User.login({ username, password }, req, res);
});

userRouter.post('/addStock', (req: express.Request, res: express.Response) => {
  const { username, stock } = req.body;
  User.addStock(stock, username, req, res);
});